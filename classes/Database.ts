import { DB, Rows } from "../deps.ts";

// Import so we get the module declaration.
import "./Rows.ts";

// Copied because it's an unexported type from SQLite library.
export type QueryParam =
  | boolean
  | number
  | bigint
  | string
  | null
  | undefined
  | Date
  | Uint8Array;

export default class Database extends DB {
  inTransaction = false;

  constructor(path: string = ":memory:") {
    super(path);

    // Create initial migration table.
    this.query(
      `CREATE TABLE IF NOT EXISTS migrations 
            (id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT NOT NULL UNIQUE,
            executed INTEGER)`,
    );

    this.commit();
  }

  query(sql: string, values?: Record<string, unknown> | QueryParam[]): Rows {
    if (!this.inTransaction) {
      super.query("BEGIN TRANSACTION;");
      this.inTransaction = true;
    }

    try {
      return super.query(sql, values);
    } catch (error) {
      console.error("Error in query, rolling back.");
      super.query("ROLLBACK;");
      throw error;
    }
  }

  commit() {
    if (!this.inTransaction) {
      throw new Error(
        "Trying to commit whilst not currently in a transaction.",
      );
    }

    super.query("COMMIT;");
    this.inTransaction = false;
  }
}
