import { Input, prompt, Select } from "../deps.ts";
import { runExactSetup } from "./exact_setup.ts";
import Playground from "../classes/Playground.ts";
import { createExactApi, exactApi } from "../main.ts";

const enum Prompts {
  ACTION = "action",
}

const enum Options {
  SETUP = "Exact Online Setup",
  MISC = "Something else ...",
  EXIT = "Exit",
}

let division = 0;

export async function run() {
  try {
    if (exactApi) {
      division = await exactApi.available();
    }
  } catch (error) {
    if (
      error.name !== "ExactOnlineServiceError" &&
      error.name !== "ExactApiNotReadyError"
    ) {
      throw error;
    }
  }

  console.log(`Exact Online API is available! Division: ${division}.`);

  await prompt([
    {
      name: Prompts.ACTION,
      message: "Please select an action:",
      type: Select,
      options: [
        Options.SETUP,
        Options.MISC,
        Options.EXIT,
      ],
      after: async ({ action }, next) => {
        switch (action) {
          case Options.SETUP:
            await runExactSetup(!!division);

            // Recreate Exact Api so it reads the new EXACT_STORAGE keys.
            createExactApi();
            return await next(Prompts.ACTION);

          case Options.MISC:
            await (new Playground()).go();
            break;
          default:
            break;
        }
      },
    },
  ]);
}
