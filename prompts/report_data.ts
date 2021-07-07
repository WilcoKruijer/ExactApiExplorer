import ExactRepository from "../repositories/ExactRepository.ts";
import DatabaseSingleton from "../singletons/DatabaseSingleton.ts";
import { colors, ensureDir, Input, prompt } from "../deps.ts";
import {
  aggregateReportingBalance,
  parseXMLBalancesResponse,
  YearlyReportingBalance,
} from "../services/ExactReportService.ts";
import type { ReportingBalance } from "../repositories/exact_models.d.ts";
import AccountTreeCreator from "../classes/AccountTreeCreator.ts";
import SettingRepository from "../repositories/SettingRepository.ts";
import ExactApiSingleton from "../singletons/ExactApiSingleton.ts";

const enum Prompts {
  YEAR = "year",
}

export async function reportDataPrompt() {
  const db = DatabaseSingleton.getInstance();
  const settingRepo = new SettingRepository(db);
  const api = ExactApiSingleton.getInstance(settingRepo);

  if (!api) {
    throw new TypeError(
      "Cannot run query prompts before Exact Api has been intialized.",
    );
  }

  const exactRepo = new ExactRepository(api);

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

        const balancesString = await exactRepo.getXMLBalance(yearNumber);
        const balanceData = parseXMLBalancesResponse(balancesString, yearNumber)
          .filter((b) => b.BalanceType === "B");

        const mapping = await exactRepo.getAccountClassificationMappings();
        const classifications = await exactRepo.getAccountClassifications();

        const treeCreator = new AccountTreeCreator(
          classifications,
          mapping,
        );

        const balances: ReportingBalance[] = await exactRepo
          .getReportingBalance(yearNumber);

        const yearlyBalances: Map<string, YearlyReportingBalance> =
          aggregateReportingBalance(balances);

        treeCreator.addReportingBalancesToTree(yearlyBalances);
        treeCreator.addXMLBalancesToTree(balanceData);

        await ensureDir("out");

        const encoder = new TextEncoder();
        const data = encoder.encode(JSON.stringify(treeCreator.tree, null, 2));
        const treeFileName = `out/tree_${year}.json`;
        await Deno.writeFile(treeFileName, data);

        console.log(
          `Written tree to: ${colors.cyan(treeFileName)}`,
        );
      },
    },
  ]);
}
