import { DB, Status } from "../deps.ts";

// Import so we get the module declaration.
import "../classes/Rows.ts";

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

  /**
   * Starts a transaction. Ignores the fact that a transaction might already
   * have been started.
   */
  startTransaction() {
    try {
      super.query("BEGIN TRANSACTION;");
    } catch (error) {
      if (
        error.name !== "SqliteError" || error.code !== Status.SqliteError ||
        error.message !== "cannot start a transaction within a transaction"
      ) {
        throw error;
      }
    }
  }

  commit() {
    super.query("COMMIT;");
  }

  rollback() {
    super.query("ROLLBACK;");
  }
}
