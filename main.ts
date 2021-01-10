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
import Database from "./classes/Database.ts";
import SettingService from "./services/SettingService.ts";
import ExactApi from "./classes/ExactApi.ts";
import SettingRepository from "./repositories/SettingRepository.ts";

// Initialize the database.
export const db = new Database("storage.sqlite");

// Initialize the ExactApi singleton
export let exactApi: ExactApi | undefined = undefined;
createExactApi();

export function createExactApi() {
  const apiOptions = SettingService.settingsToExactOptions(
    SettingRepository.getExactStorageSettings(),
  );

  if (!apiOptions) {
    return;
  }

  exactApi = new ExactApi(apiOptions);
  exactApi.setTokenCallback = (options) => {
    const settings = SettingService.exactOptionsToSettings(
      options,
    );
    SettingRepository.setAll(settings);
    console.log(">>> Saving Exact Storage to DISK.");
  };
  console.log("Created Exact API.");
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

// Start he main prompts
await run();
