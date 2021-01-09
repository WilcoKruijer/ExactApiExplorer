import db from "../database.ts";

/**
 * List of migrations to run, in this order.
 */
const migrations = [
  "./000_initial.ts",
];

export interface Migration {
  upgrade(): void;
  downgrade(): void;
}

export async function upgrade() {
  let upgradedRevisions = 0;
  for (const migrationName of migrations) {
    const result = db.query(
      "SELECT executed FROM migrations WHERE name = ?",
      [migrationName],
    ).oneOrUndefined();

    if (result && result.length && result[0]) {
      // This migration has already been executed.
      continue;
    }

    const migration = await import(migrationName);
    const instance: Migration = new migration.default();

    console.log(`Upgrading: '${migrationName}'.`);
    instance.upgrade();

    db.query(
      "INSERT INTO migrations (name, executed) VALUES (:migrationName, 1)" +
        "ON CONFLICT (name) DO UPDATE SET executed=1 WHERE name = :migrationName",
      { migrationName },
    );

    upgradedRevisions += 1;
  }

  if (!upgradedRevisions) {
    console.error("Nothing to upgrade.");
  }
}

export async function downgrade() {
  while (migrations.length) {
    const migrationName = migrations.pop();

    const result = db.query(
      "SELECT executed FROM migrations WHERE name = ? AND executed = 1",
      [migrationName],
    ).oneOrUndefined();

    if (!result) {
      // This migration has not yet been executed.
      continue;
    }

    const migration = await import(migrationName!);
    const instance: Migration = new migration.default();

    console.log(`Downgrading: '${migrationName}'.`);
    instance.downgrade();

    db.query(
      "UPDATE migrations SET executed=0 WHERE name = :migrationName",
      { migrationName },
    );

    // Only downgrade 1 revision.
    return;
  }

  console.error("Nothing to downgrade.");
}
