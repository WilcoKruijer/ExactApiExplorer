import { Input, prompt, Select } from "../deps.ts";
import { runExactSetup } from "./exact_setup.ts";

// import classTransformer from 'https://cdn.skypack.dev/class-transformer';

const enum Prompts {
  ACTION = "action",
}

const enum Options {
  SETUP = "Exact Online Setup",
  EXIT = "Exit",
}

export async function run() {
  await prompt([
    {
      name: Prompts.ACTION,
      message: "Please select an action:",
      type: Select,
      options: [
        Options.SETUP,
        Options.EXIT,
      ],
      after: async ({ action }, next) => {
        switch (action) {
          case Options.SETUP:
            await runExactSetup();
            break;

          default:
            break;
        }
      },
    },
  ]);
}
