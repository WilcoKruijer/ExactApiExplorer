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

run();
