import { ExactOnlineServiceError } from "../classes/ExactApi.ts";
import { colors, ensureDir, Input, prompt } from "../deps.ts";
import ExactRepository from "../repositories/ExactRepository.ts";
import SettingRepository from "../repositories/SettingRepository.ts";
import DatabaseSingleton from "../singletons/DatabaseSingleton.ts";
import ExactApiSingleton from "../singletons/ExactApiSingleton.ts";
import DebouncedInput from "./DebouncedInput.ts";

const enum Prompts {
  ACCOUNT = "account",
  YEAR = "year",
}

export default class TransactionsPrompt {
  db = DatabaseSingleton.getInstance();
  settingRepo = new SettingRepository(this.db);
  api = ExactApiSingleton.getInstance(this.settingRepo);
  exactRepo;

  constructor() {
    if (!this.api) {
      throw new Error(
        "Cannot run transactions prompts before Exact Api has been intialized.",
      );
    }

    this.exactRepo = new ExactRepository(this.api);
  }

  async run() {
    let accountDescription: string | undefined;

    return prompt([
      {
        name: Prompts.ACCOUNT,
        message: "Please select the ledger account to get transactions from:",
        type: DebouncedInput,
        list: true,
        info: true,
        suggestions: (await this.exactRepo.getAccounts("a")).map((a) =>
          a.Description
        ),
        debounceTime: 1000,
        update: async (input: string) => {
          return (await this.exactRepo.getAccounts(input)).map((a) =>
            a.Description
          );
        },
        after: ({ account }, next) => {
          if (!account) {
            return next(Prompts.ACCOUNT);
          }

          accountDescription = account;
          return next();
        },
      },
      {
        name: Prompts.YEAR,
        message: "Please enter the year to get data from:",
        type: Input,
        after: async ({ year }, next) => {
          if (!year) {
            return next(Prompts.YEAR);
          }

          const yearNumber = +year;
          if (!isFinite(yearNumber)) {
            console.log(`'${year}' is not a number.`);
            return next(Prompts.YEAR);
          }

          if (!accountDescription) {
            // This should not happen.
            return next(Prompts.YEAR);
          }

          await this.getTransactions(accountDescription, yearNumber);
        },
      },
    ]);
  }

  private async getTransactions(accountDescription: string, year: number) {
    console.log(`Getting '${accountDescription}'.`);

    const accounts = await this.exactRepo.getAccounts(accountDescription, 1);
    if (!accounts.length) {
      console.log("Failed to get account we just selected.");
      return false;
    }
    const guid = accounts[0].ID;

    if (!guid) {
      console.log("Faield to get GUID from account we retrieved.");
      return false;
    }

    let lines;
    try {
      lines = await this.exactRepo.getTransactionLines(guid, year);
    } catch (e) {
      if (!(e instanceof ExactOnlineServiceError)) {
        throw e;
      }

      console.log("Failed to get transactions.");
      return false;
    }

    await ensureDir("out");
    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify(lines, null, 2));
    const fileName = `out/transactions_${year}_${
      accountDescription.replace(/\s/g, "_")
    }.json`;
    await Deno.writeFile(fileName, data);

    console.log(
      `Written transactions to: ${colors.cyan(fileName)}`,
    );

    return true;
  }
}
