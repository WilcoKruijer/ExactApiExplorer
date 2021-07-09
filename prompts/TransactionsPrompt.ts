import { Number, prompt } from "../deps.ts";
import ExactRepository from "../repositories/ExactRepository.ts";
import { writeJsonFile } from "../repositories/FileRepository.ts";
import SettingRepository from "../repositories/SettingRepository.ts";
import ExactTransactionService from "../services/ExactTransactionService.ts";
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
        type: Number,
        min: 1970,
        max: 3000,
        float: false,
        after: async ({ year }, next) => {
          if (!year) {
            return next(Prompts.YEAR);
          }

          if (!accountDescription) {
            // This should not happen.
            return next(Prompts.YEAR);
          }

          const fileName = `transactions_${year}_${accountDescription}`;

          const transactionService = new ExactTransactionService(
            this.exactRepo,
          );
          const lines = await transactionService.getTransactions(
            accountDescription,
            year,
          );

          await writeJsonFile(fileName, lines, lines.length < 100);
        },
      },
    ]);
  }
}
