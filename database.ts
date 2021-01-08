import Database from "./classes/Database.ts";

const db = new Database("storage.sqlite");

export async function upgrade() {
}

export async function downgrade() {
}

const q = `SELECT * FROM migrations WHERE name LIKE 'asd%';`;
const r = db.query(q).oneOrUndefined();
console.log("R", r);

export default db;
