import { Migration } from "./mod.ts";
import { db } from "../main.ts";

export default class InitialMigration implements Migration {
  upgrade() {
    db.query(
      `CREATE TABLE IF NOT EXISTS settings 
            (id INTEGER PRIMARY KEY AUTOINCREMENT, 
            key TEXT NOT NULL UNIQUE,
            value TEXT NOT NULL);`,
    );
  }

  downgrade() {
    db.query("DROP TABLE settings;");
  }
}
