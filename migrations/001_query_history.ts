import Database from "../classes/Database.ts";
import { Migration } from "./mod.ts";

export default class QueryHistoryMigration implements Migration {
  upgrade(db: Database) {
    db.query(
      `CREATE TABLE IF NOT EXISTS query_history 
            (id INTEGER PRIMARY KEY AUTOINCREMENT, 
            created DATETIME DEFAULT CURRENT_TIMESTAMP,
            endpoint TEXT NOT NULL,
            selected TEXT,
            filter TEXT,
            top TEXT);`,
    );

    db.query(
      `CREATE TABLE IF NOT EXISTS endpoint_parameters 
            (id INTEGER PRIMARY KEY AUTOINCREMENT, 
            endpoint TEXT NOT NULL,
            variable TEXT NOT NULL,
            type TEXT NOT NULL,
            UNIQUE(endpoint, variable));`,
    );
  }

  downgrade(db: Database) {
    db.query("DROP TABLE query_history;");
    db.query("DROP TABLE endpoint_parameters;");
  }
}
