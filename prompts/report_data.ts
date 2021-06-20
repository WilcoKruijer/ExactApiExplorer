import ExactRepository, {
  ReportingBalance,
} from "../repositories/ExactRepository.ts";
import DatabaseSingleton from "../singletons/database.ts";
import { Input, prompt } from "../deps.ts";

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
        const balances: Partial<ReportingBalance>[] = await exactRepo
          .getReportingBalance(yearNumber);

        for (const b of balances) {
          delete b.GLAccount;
          delete b.ID;
          delete b.Division;
          b.GLAccountDescription = b.GLAccountDescription?.substr(0, 30);
        }

        console.table(balances);
      },
    },
  ]);
}
