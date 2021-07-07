import Database from "../classes/Database.ts";

export default class DatabaseSingleton {
  private static db: Database | undefined = undefined;

  static getInstance(): Database {
    if (!DatabaseSingleton.db) {
      // Initialize the database.
      DatabaseSingleton.db = new Database("storage.sqlite");
    }

    return DatabaseSingleton.db;
  }
}
