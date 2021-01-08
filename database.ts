import Database from "./classes/Database.ts";

const db = new Database("storage.sqlite");

export async function upgrade() {
}

export async function downgrade() {
}

export default db;
