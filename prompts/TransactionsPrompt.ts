import { Input, Number, prompt } from "../deps.ts";
import { writeJsonFile } from "../repositories/FileRepository.ts";
import ExactTransactionService from "../services/ExactTransactionService.ts";
import BasePrompt from "./BasePrompt.ts";
import DebouncedInput from "./DebouncedInput.ts";

const enum Prompts {
  ACCOUNT = "account",
  YEAR = "year",
  JOURNAL = "journal",
}

export default class TransactionsPrompt extends BasePrompt {
  constructor() {
    super();
    this.ensureApi();
  }

  async run() {
    let accountDescription: string | undefined;
    let year: number | undefined;
    let journalDescription: string | undefined;

    const journals = await this.exactRepo.getJournals();

    await prompt([
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
        after: (res, next) => {
          if (!res.year) {
            return next(Prompts.YEAR);
          }

          year = res.year;
          return next();
        },
      },
      {
        name: Prompts.JOURNAL,
        message: "Please select a journal to filter (empty for no filter):",
        type: Input,
        list: true,
        info: true,
        suggestions: journals.map((j) => j.Description),
        after: ({ journal }, next) => {
          journalDescription = journal;
          return next();
        },
      },
    ]);

    if (!accountDescription || !year) {
      // This should not happen
      throw new Error("Prompt failed.");
    }

    let fileName = `transactions_${year}_${accountDescription}`;

    const journal = journalDescription
      ? journals.find((j) => j.Description === journalDescription)
      : undefined;

    if (journal) {
      fileName += "_" + journal.Description;
    }

    const transactionService = new ExactTransactionService(
      this.exactRepo,
    );
    const lines = await transactionService.getTransactions(
      accountDescription,
      year,
      journal?.Code,
    );

    await writeJsonFile(fileName, lines, lines.length < 100);
  }
}
