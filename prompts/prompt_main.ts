import { colors, Input, prompt, Select } from "../deps.ts";
import { runExactSetup } from "./exact_setup.ts";
import ExactRepository from "../repositories/ExactRepository.ts";
import runQueryPrompts from "./exact_query.ts";
import DatabaseSingleton from "../singletons/database.ts";

const enum Prompts {
  ACTION = "action",
  SELECT_DIVISION = "division",
}

const enum Options {
  QUERY = "Execute an API query",
  DIVISION = "Set Exact Online division",
  SETUP = "Exact Online setup",
  EXIT = "Exit",
}

const db = DatabaseSingleton.getInstance();
const exactRepo = new ExactRepository(db);

async function printCurrentDivision(division: number) {
  const [{ Description }] = await exactRepo.getDivisionByCode(division);
  console.log(
    `Selected division: ${colors.brightGreen(Description)} (${
      colors.yellow(division + "")
    }).`,
  );
}

export async function run() {
  let division = 0;

  exactRepo.constructApi();

  try {
    if (exactRepo.api) {
      const retrievedDivision = await exactRepo.api.retrieveDivision();
      division = exactRepo.api.division ?? retrievedDivision;
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
            if (exactRepo.api?.division) {
              division = exactRepo.api.division;
              await printCurrentDivision(exactRepo.api.division);
            }

            return await next(Prompts.ACTION);

          default:
            break;
        }
      },
    },
  ]);
}

async function selectDivision() {
  const divisions = await exactRepo.getDivisions();
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
        if (exactRepo.api && division) {
          exactRepo.api.division = +division;
          await printCurrentDivision(+division);
        }
      },
    },
  ]);
}
