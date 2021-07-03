import { Migration } from "./Migrator.ts";
import type Database from "../classes/Database.ts";

export default class InitialMigration implements Migration {
  upgrade(db: Database) {
    db.query(
      `CREATE TABLE IF NOT EXISTS settings 
            (id INTEGER PRIMARY KEY AUTOINCREMENT, 
            key TEXT NOT NULL UNIQUE,
            value TEXT NOT NULL);`,
    );
  }

  downgrade(db: Database) {
    db.query("DROP TABLE IF EXISTS settings;");
  }
}
