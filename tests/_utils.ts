import Database from "../classes/Database.ts";
import Migrator from "../migrations/Migrator.ts";

export const db = new Database();
await (new Migrator(db)).upgrade();
