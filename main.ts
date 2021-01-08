/**
 * Entrypoint of this project.
 * Run with: `deno run --unstable --allow-read=. --allow-write=. main.ts`
 */

import { parse } from "./deps.ts";
import { downgrade, upgrade } from "./migrations/mod.ts";

const flags = parse(Deno.args);

if ("migrate" in flags) {
  if (flags["migrate"] === "up") {
    upgrade();
  } else if (flags["migrate"] === "down") {
    downgrade();
  } else {
    console.error(
      "Invalid value given for 'migrate'. Expected 'up' or 'down'. Ignoring.",
    );
  }
}
