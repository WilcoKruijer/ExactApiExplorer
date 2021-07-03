import type Database from "../classes/Database.ts";

import InitialMigration from "./000_initial.ts";
import QueryHistoryMigration from "./001_query_history.ts";

/** List of migrations to run, in this order. */
export const migrations: { new (db: Database): Migration }[] = [
  InitialMigration,
  QueryHistoryMigration,
];

export abstract class Migration {
  abstract upgrade(db: Database): void;
  abstract downgrade(db: Database): void;
}

export default class Migrator {
  #db: Database;

  constructor(db: Database) {
    this.#db = db;

    // For backward compatibility, this can be removed at some point.
    db.query(
      "UPDATE migrations SET name='InitialMigration' WHERE name = './000_initial.ts'",
    );
    db.query(
      "UPDATE migrations SET name='QueryHistoryMigration' WHERE name = './001_query_history.ts'",
    );
  }

  public upgrade() {
    let upgradedRevisions = 0;
    for (const migrationClass of migrations) {
      const migrationName = migrationClass.name;
      const migration = new migrationClass(this.#db);

      const result = this.#db.query(
        "SELECT executed FROM migrations WHERE name = ?",
        [migrationName],
      ).oneOrUndefined();

      if (result && result.length && result[0]) {
        // This migration has already been executed.
        continue;
      }

      console.log(`Upgrading: '${migrationName}'.`);
      migration.upgrade(this.#db);

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

  public downgrade() {
    let migrationClass: { new (db: Database): Migration } | undefined;
    let migrationName;
    let result;

    while (!result) {
      migrationClass = migrations.pop();
      if (!migrationClass) {
        console.error("Nothing to downgrade.");
        return;
      }

      migrationName = migrationClass.name;

      result = this.#db.query(
        "SELECT executed FROM migrations WHERE name = ? AND executed = 1",
        [migrationName],
      ).oneOrUndefined();
    }

    const migration = new migrationClass!(this.#db);

    console.log(`Downgrading: '${migrationName}'.`);
    migration.downgrade(this.#db);

    this.#db.query(
      "UPDATE migrations SET executed=0 WHERE name = :migrationName",
      { migrationName },
    );
  }
}
