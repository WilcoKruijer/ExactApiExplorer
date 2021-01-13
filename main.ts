/**
 * Entrypoint of this project.
 * Run with: `deno run --unstable --allow-read=. --allow-write=. --allow-net=0.0.0.0,start.exactonline.nl main.ts`
 * 
 * Write lock file after adding dependencies:
 * deno cache --unstable main.ts --lock lock.json --lock-write
 */

import { parse } from "./deps.ts";
import Migrator from "./migrations/Migrator.ts";
import { run } from "./prompts/main.ts";
import DatabaseSingleton from "./singletons/database.ts";

// export { default as DatabaseSingleton } from "./singletons/database.ts";

if (!import.meta.main) {
  throw new Error(
    "Main.ts is meant to run as the entrypoint of this application.",
  );
}

// We need to create the database singleton before we can run migrations.
const db = DatabaseSingleton.getInstance();
const migrator = new Migrator(db);

// Handle command-line arguments.
const flags = parse(Deno.args);
if ("migrate" in flags) {
  if (flags["migrate"] === "up") {
    await migrator.upgrade();
  } else if (flags["migrate"] === "down") {
    await migrator.downgrade();
  } else {
    console.error(
      "Invalid value given for 'migrate'. Expected 'up' or 'down'. Ignoring.",
    );
    Deno.exit(1);
  }
}

// Start the main prompts
await run();
