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

// db.query(
//     `INSERT INTO migrations (name, executed) VALUES (:name, :executed);`,
//     { name, executed },
//   );

export async function upgrade() {
  for (const migrationName of migrations) {
    for (
      const [executed] of db.query(
        "SELECT executed FROM migrations WHERE name = ?",
        [migrationName],
      )
    ) {
      // bug; migration will not be in database yet.
      console.log();
      if (!executed) {
        const migration = await import(migrationName);
        const instance = new migration.default();

        console.log("Will upgrade", migrationName);
      }
    }
  }
}

export async function downgrade() {
}
