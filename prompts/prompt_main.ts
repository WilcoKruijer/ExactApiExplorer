import { colors, prompt, Select } from "../deps.ts";
import { awaitLogin, runExactSetup } from "./exact_setup.ts";
import ExactRepository from "../repositories/ExactRepository.ts";
import runQueryPrompts from "./exact_query.ts";
import DatabaseSingleton from "../singletons/DatabaseSingleton.ts";
import ReportDataPrompt from "./ReportDataPrompt.ts";
import ExactApiSingleton from "../singletons/ExactApiSingleton.ts";
import SettingRepository from "../repositories/SettingRepository.ts";
import { ExactOnlineServiceError } from "../classes/ExactApi.ts";
import TransactionsPrompt from "./TransactionsPrompt.ts";
import BudgetPrompt from "./BudgetPrompt.ts";

const enum Prompts {
  ACTION = "action",
  SELECT_DIVISION = "division",
}

const enum Options {
  QUERY = "Execute an API query",
  REPORT_DATA = "Get data for report",
  TRANSACTIONS = "Get all transactions",
  BUDGET = "Get a budget scenario",
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
    let division;
    try {
      division = await api.retrieveDivision();
    } catch (e) {
      if (!(e instanceof ExactOnlineServiceError)) {
        throw e;
      }
    }

    if (division) {
      console.log(
        "Exact Online API is available!",
      );
      exactRepo = new ExactRepository(api);

      await printCurrentDivision(exactRepo, division);
    } else {
      console.log(
        colors.red("Error:") + " Exact Online API not available.",
      );

      console.log("Please relogin...\n");

      await awaitLogin(settingRepo);
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
          name: Options.TRANSACTIONS,
          value: Options.TRANSACTIONS,
          disabled: !exactRepo,
        },
        {
          name: Options.REPORT_DATA,
          value: Options.REPORT_DATA,
          disabled: !exactRepo,
        },
        {
          name: Options.BUDGET,
          value: Options.BUDGET,
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
          case Options.TRANSACTIONS:
            await new TransactionsPrompt().run();
            return next(Prompts.ACTION);
          case Options.REPORT_DATA:
            await new ReportDataPrompt().run();
            return next(Prompts.ACTION);
          case Options.BUDGET:
            await new BudgetPrompt().run();
            return next(Prompts.ACTION);
          case Options.DIVISION:
            // Cannot select division option when repo is undefined.
            await selectDivision(exactRepo!);
            return next(Prompts.ACTION);

          case Options.SETUP:
            await runExactSetup(!!exactRepo);
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
