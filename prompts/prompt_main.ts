import { colors, prompt, Select } from "../deps.ts";
import { runExactSetup } from "./exact_setup.ts";
import ExactRepository from "../repositories/ExactRepository.ts";
import runQueryPrompts from "./exact_query.ts";
import DatabaseSingleton from "../singletons/DatabaseSingleton.ts";
import { reportDataPrompt } from "./report_data.ts";
import ExactApiSingleton from "../singletons/ExactApiSingleton.ts";
import SettingRepository from "../repositories/SettingRepository.ts";

const enum Prompts {
  ACTION = "action",
  SELECT_DIVISION = "division",
}

const enum Options {
  QUERY = "Execute an API query",
  REPORT_DATA = "Get data for report",
  DIVISION = "Set Exact Online division",
  SETUP = "Exact Online setup",
  EXIT = "Exit",
}

async function printCurrentDivision(
  exactRepo: ExactRepository,
  division: number,
) {
  const [{ Description }] = await exactRepo.getDivisionByCode(division);
  console.log(
    `Selected division: ${colors.brightGreen(Description)} (${
      colors.yellow(division + "")
    }).`,
  );
}

export async function run() {
  const db = DatabaseSingleton.getInstance();
  const settingRepo = new SettingRepository(db);
  let api = ExactApiSingleton.getInstance(settingRepo);
  let exactRepo: ExactRepository | undefined;

  if (api) {
    exactRepo = new ExactRepository(api);
    const division = await api.retrieveDivision();

    console.log(
      "Exact Online API is available!",
    );

    if (division) {
      await printCurrentDivision(exactRepo, division);
    } else {
      console.log("No division found.");
    }
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
          disabled: !exactRepo,
        },
        {
          name: Options.REPORT_DATA,
          value: Options.REPORT_DATA,
          disabled: !exactRepo,
        },
        {
          name: Options.DIVISION,
          value: Options.DIVISION,
          disabled: !exactRepo,
        },
        Options.SETUP,
        Options.EXIT,
      ],
      after: async ({ action }, next) => {
        switch (action) {
          case Options.QUERY:
            await runQueryPrompts();
            return next(Prompts.ACTION);
          case Options.REPORT_DATA:
            await reportDataPrompt();
            return next(Prompts.ACTION);
          case Options.DIVISION:
            // Cannot select division option when repo is undefined.
            await selectDivision(exactRepo!);
            return next(Prompts.ACTION);

          case Options.SETUP:
            await runExactSetup(!!api);
            api = ExactApiSingleton.getInstance(settingRepo);

            if (!api) {
              throw new Error("Exact setup finished without intializing API.");
            }

            exactRepo = new ExactRepository(api);
            return run();
        }
      },
    },
  ]);
}

async function selectDivision(exactRepo: ExactRepository) {
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
      after: async ({ division }) => {
        if (!division) {
          throw new TypeError("No division selected.");
        }
        exactRepo.api.division = +division;
        await printCurrentDivision(exactRepo, +division);
      },
    },
  ]);
}
