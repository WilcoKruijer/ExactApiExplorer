import { prompt } from "../deps.ts";
import { writeJsonFile } from "../repositories/FileRepository.ts";
import ExactBudgetService from "../services/ExactBudgetService.ts";
import BasePrompt from "./BasePrompt.ts";
import DebouncedInput from "./DebouncedInput.ts";

const enum Prompts {
  BUDGET = "budget",
}

export default class BudgetPrompt extends BasePrompt {
  constructor() {
    super();
    this.ensureApi();
  }

  async run() {
    return prompt([
      {
        name: Prompts.BUDGET,
        message: "Please select the ledger account to get transactions from:",
        type: DebouncedInput,
        list: true,
        info: true,
        suggestions: (await this.exactRepo.getBudgetScenario()).map((b) =>
          b.Description
        ),
        debounceTime: 1000,
        update: async (input: string) => {
          return (await this.exactRepo.getBudgetScenario(input)).map((b) =>
            b.Description
          );
        },
        after: async ({ budget }, next) => {
          if (!budget) {
            return next(Prompts.BUDGET);
          }

          const budgetService = new ExactBudgetService(this.exactRepo);
          const budgetData = await budgetService.getBudgetScenario(budget);

          await writeJsonFile(
            `budget_${budget}`,
            Array.from(budgetData.values()),
          );

          return next();
        },
      },
    ]);
  }
}
