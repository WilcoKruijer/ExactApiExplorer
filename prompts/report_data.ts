import ExactRepository, {
  ReportingBalance,
} from "../repositories/ExactRepository.ts";
import DatabaseSingleton from "../singletons/database.ts";
import { Input, prompt } from "../deps.ts";
import {
  aggregateReportingBalance,
  YearlyReportingBalance,
} from "../services/ExactReportService.ts";

const db = DatabaseSingleton.getInstance();
const exactRepo = new ExactRepository(db);

const enum Prompts {
  YEAR = "year",
}

export async function reportDataPrompt() {
  await prompt([
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

        // const periods = await exactRepo.getFinancialPeriods(yearNumber);
        // const mapping = await exactRepo.getAccountClassificationMappings();
        const balances: ReportingBalance[] = await exactRepo
          .getReportingBalance(yearNumber);

        const yearlyBalances: Map<string, Partial<YearlyReportingBalance>> =
          aggregateReportingBalance(balances);

        for (const b of yearlyBalances.values()) {
          delete b.GLAccount;
          delete b.ID;
          delete b.Division;
          b.GLAccountDescription = b.GLAccountDescription?.substr(0, 30);
        }

        console.table([...yearlyBalances.values()]);
      },
    },
  ]);
}
