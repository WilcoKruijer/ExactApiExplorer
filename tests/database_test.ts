import { assertEquals, assertThrows } from "../deps.ts";
import Database from "../classes/Database.ts";
import { OneRowError } from "../classes/Rows.ts";

// Run with:
// deno test --unstable tests/database_test.ts

const db = new Database();

Deno.test("Database is initialized", () => {
  const [[res]] = db.query("SELECT 1=1;");
  assertEquals(res, 1);
});

Deno.test("oneOrThrow returns 1 result", () => {
  const [res] = db.query("SELECT 1=1;").oneOrThrow();
  assertEquals(res, 1);
});

Deno.test("oneOrThrow throws when no result", () => {
  assertThrows(
    () => {
      db.query("SELECT * FROM sqlite_master WHERE 1 = 0;").oneOrThrow();
    },
    OneRowError,
    "No rows",
  );
});

Deno.test("oneOrThrow throws when >1 result", () => {
  assertThrows(
    () => {
      db.query("SELECT 1 UNION ALL SELECT 2;").oneOrThrow();
    },
    OneRowError,
    "Multiple rows",
  );
});

Deno.test("oneOrUndefined returns 1 result", () => {
  const [res] = db.query("SELECT 1=1;").oneOrUndefined();
  assertEquals(res, 1);
});

Deno.test("oneOrUndefined undefined when no result", () => {
  const res = db.query("SELECT * FROM sqlite_master WHERE 1 = 0;")
    .oneOrUndefined();
  assertEquals(res, undefined);
});

Deno.test("oneOrUndefined throws when >1 result", () => {
  assertThrows(
    () => {
      db.query("SELECT 1 UNION ALL SELECT 2;").oneOrUndefined();
    },
    OneRowError,
    "Multiple rows",
  );
});
