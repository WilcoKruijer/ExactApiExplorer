import ExactRepository from "../repositories/ExactRepository.ts";
import { BudgetScenarioValue } from "../repositories/exact_models.d.ts";

export default class ExactBudgetService {
  #exactRepo;

  constructor(exactRepo: ExactRepository) {
    this.#exactRepo = exactRepo;
  }

  async getBudgetScenario(budgetDescription: string) {
    console.log(`Getting budget '${budgetDescription}'.`);
    const budgets = await this.#exactRepo.getBudgetScenario(
      budgetDescription,
      1,
    );

    if (!budgets.length) {
      throw new TypeError(`Failed to get budget for '${budgetDescription}'.`);
    }

    return aggregateBudgetScenarioValues(
      await this.#exactRepo.getBudgetScenarioValues(budgets[0].ID),
    );
  }
}

export function aggregateBudgetScenarioValues(budgets: BudgetScenarioValue[]) {
  const map: Map<string, Omit<BudgetScenarioValue, "ReportingPeriod">> =
    new Map();

  for (const budget of budgets) {
    const total = map.get(budget.GLAccountCode);

    if (!total) {
      // deno-lint-ignore no-unused-vars
      const { ReportingPeriod, ...total } = budget;
      map.set(budget.GLAccountCode, { ...total });
      continue;
    }

    total.AmountDC += budget.AmountDC;
  }

  return map;
}
