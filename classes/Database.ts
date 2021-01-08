import { DB, Rows } from "../deps.ts";

// Import so we get the module declaration.
import "../classes/Rows.ts";

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
    super.query(
      `CREATE TABLE IF NOT EXISTS migrations 
            (id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT NOT NULL UNIQUE,
            executed INTEGER)`,
    );
  }

  startTransaction() {
    super.query("BEGIN TRANSACTION;");
  }

  commit() {
    super.query("COMMIT;");
  }

  rollback() {
    super.query("ROLLBACK;");
  }
}
