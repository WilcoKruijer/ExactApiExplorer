/**
 * Entrypoint of this project.
 * Run with: `deno run --unstable --allow-read=. --allow-write=. --allow-net=0.0.0.0,start.exactonline.nl main.ts`
 * 
 * Write lock file after adding dependencies:
 * deno cache --unstable main.ts --lock lock.json --lock-write
 */

import { parse } from "./deps.ts";
import { downgrade, upgrade } from "./migrations/mod.ts";
import { run } from "./prompts/main.ts";
import { createExactApi } from "./singletons/exact_api.ts";

// We need to create the database singleton before we can run migrations.
export { db } from "./singletons/database.ts";
export { createExactApi, exactApi } from "./singletons/exact_api.ts";

if (!import.meta.main) {
  throw new Error(
    "Main.ts is meant to run as the entrypoint of this application.",
  );
}

// Handle command-line arguments.
const flags = parse(Deno.args);
if ("migrate" in flags) {
  if (flags["migrate"] === "up") {
    await upgrade();
  } else if (flags["migrate"] === "down") {
    await downgrade();
  } else {
    console.error(
      "Invalid value given for 'migrate'. Expected 'up' or 'down'. Ignoring.",
    );
  }
}

createExactApi();

// Start the main prompts
await run();
