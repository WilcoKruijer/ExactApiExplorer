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
    const instance = new migration.default();

    console.log("Will upgrade", migrationName);
  }
}

export async function downgrade() {
}
