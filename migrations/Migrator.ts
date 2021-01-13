import type Database from "../classes/Database.ts";

/** List of migrations to run, in this order. */
export const migrations = [
  "./000_initial.ts",
  "./001_query_history.ts",
];

export interface Migration {
  upgrade(db: Database): void;
  downgrade(db: Database): void;
}

export default class Migrator {
  #db: Database;

  constructor(db: Database) {
    this.#db = db;
  }

  public async upgrade() {
    let upgradedRevisions = 0;
    for (const migrationName of migrations) {
      const result = this.#db.query(
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
      instance.upgrade(this.#db);

      this.#db.query(
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

  public async downgrade() {
    let migrationName;
    let result;

    while (!result);
    {
      migrationName = migrations.pop();

      if (!migrationName) {
        console.error("Nothing to downgrade.");
        return;
      }

      result = this.#db.query(
        "SELECT executed FROM migrations WHERE name = ? AND executed = 1",
        [migrationName],
      ).oneOrUndefined();
    }

    const migration = await import(migrationName);
    const instance: Migration = new migration.default();

    console.log(`Downgrading: '${migrationName}'.`);
    instance.downgrade(this.#db);

    this.#db.query(
      "UPDATE migrations SET executed=0 WHERE name = :migrationName",
      { migrationName },
    );
  }
}
