import { colors, Input, prompt, Select } from "../deps.ts";
import { runExactSetup } from "./exact_setup.ts";
import Playground from "../classes/Playground.ts";
import { exactApi } from "../main.ts";
import ExactRepository from "../repositories/ExactRepository.ts";
import runQueryPrompts from "./exact_query.ts";

const enum Prompts {
  ACTION = "action",
  SELECT_DIVISION = "division",
}

const enum Options {
  QUERY = "Execute an API query",
  DIVISION = "Set Exact Online division",
  SETUP = "Exact Online setup",
  MISC = "Something else ...",
  EXIT = "Exit",
}

async function printCurrentDivision(division: number) {
  const [{ Description }] = await ExactRepository.getDivisionByCode(division);
  console.log(
    `Selected division: ${colors.brightGreen(Description)} (${
      colors.yellow(division + "")
    }).`,
  );
}

export async function run() {
  let division = 0;

  try {
    if (exactApi) {
      const retrievedDivision = await exactApi.retrieveDivision();
      division = exactApi.division ?? retrievedDivision;
    }
  } catch (error) {
    if (
      error.name !== "ExactOnlineServiceError" &&
      error.name !== "ExactApiNotReadyError"
    ) {
      throw error;
    }
  }

  if (division) {
    console.log(
      "Exact Online API is available!",
    );

    await printCurrentDivision(division);
  }

  await prompt([
    {
      name: Prompts.ACTION,
      message: "Please select an action:",
      type: Select,
      options: [
        {
          name: Options.QUERY,
          value: Options.QUERY,
          disabled: division === 0,
        },
        {
          name: Options.DIVISION,
          value: Options.DIVISION,
          disabled: division === 0,
        },
        Options.SETUP,
        Options.MISC,
        Options.EXIT,
      ],
      after: async ({ action }, next) => {
        switch (action) {
          case Options.QUERY:
            await runQueryPrompts();
            return await next(Prompts.ACTION);
          case Options.DIVISION:
            await selectDivision();
            return await next(Prompts.ACTION);

          case Options.SETUP:
            await runExactSetup(!!division);
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

async function selectDivision() {
  const divisions = await ExactRepository.getDivisions();
  const options: { name: string; value: string }[] = [];

  for (const div of divisions) {
    options.push({
      name: div.Description,
      value: div.Code + "",
    });
  }

  await prompt([
    {
      name: Prompts.SELECT_DIVISION,
      message: "Please select a division:",
      type: Select,
      options: options,
      after: async ({ division }, next) => {
        if (exactApi && division) {
          exactApi.division = +division;
          await printCurrentDivision(+division);
        }
      },
    },
  ]);
}
