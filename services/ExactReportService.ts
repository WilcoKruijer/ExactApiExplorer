import AccountTreeCreator from "../classes/AccountTreeCreator.ts";
import { DOMParser, Element } from "../deps.ts";

import type { XMLBalancesResponse } from "../repositories/ExactRepository.ts";
import ExactRepository from "../repositories/ExactRepository.ts";
import type { ReportingBalance } from "../repositories/exact_models.d.ts";

export type YearlyReportingBalance = Omit<ReportingBalance, "ReportingPeriod">;

export type XMLBalance = Pick<
  ReportingBalance,
  | "GLAccountCode"
  | "GLAccountDescription"
  | "Amount"
  | "AmountCredit"
  | "AmountDebit"
  | "BalanceType"
  | "ReportingYear"
>;

export default class ExactReportService {
  #exactRepo;

  constructor(exactRepo: ExactRepository) {
    this.#exactRepo = exactRepo;
  }

  async getReportForYear(year: number) {
    const balancesString = await this.#exactRepo.getXMLBalance(year);
    const balanceData = parseXMLBalancesResponse(balancesString, year)
      .filter((b) => b.BalanceType === "B");

    const mapping = await this.#exactRepo.getAccountClassificationMappings();
    const classifications = await this.#exactRepo.getAccountClassifications();

    const treeCreator = new AccountTreeCreator(
      classifications,
      mapping,
    );

    const balances: ReportingBalance[] = await this.#exactRepo
      .getReportingBalance(year);

    const yearlyBalances: Map<string, YearlyReportingBalance> =
      aggregateReportingBalance(balances);

    treeCreator.addReportingBalancesToTree(yearlyBalances);
    treeCreator.addXMLBalancesToTree(balanceData);

    return treeCreator.tree;
  }
}

/**
 * @param balances
 * @returns a map from AccountCode to a reporting balance
 */
export function aggregateReportingBalance(balances: ReportingBalance[]) {
  const map: Map<string, YearlyReportingBalance> = new Map();

  for (const balance of balances) {
    const total = map.get(balance.GLAccountCode);

    if (balance.BalanceType === "B") {
      throw new TypeError(
        "Cannot aggregate ReportingBalance of type Balance. " +
          "This will result in incorrect results.",
      );
    }

    if (!total) {
      // deno-lint-ignore no-unused-vars
      const { ReportingPeriod, ...total } = balance;
      map.set(balance.GLAccountCode, { ...total });
      continue;
    }

    total.Amount += balance.Amount;
    total.AmountCredit += balance.AmountCredit;
    total.AmountDebit += balance.AmountDebit;
    total.Count += balance.Count;
  }

  return map;
}

export function parseXMLBalancesResponse(
  response: XMLBalancesResponse,
  year: number,
): XMLBalance[] {
  // We use text/html instead of text/xml since that hasn't been implemented
  // in the DOMParser yet.
  const document = new DOMParser().parseFromString(response, "text/html");

  if (!document) {
    throw new Error("Document is empty.");
  }

  const balanceNodes = document.querySelectorAll("Balance");
  const balances: XMLBalance[] = [];

  for (const node of balanceNodes) {
    const element = node as Element;
    const accountDescription = element.querySelector("Description")?.innerText;
    const balanceType = element.attributes["balancetype"];

    if (!accountDescription) {
      throw new TypeError("Invalid account description in XML string.");
    }

    if (balanceType !== "B" && balanceType !== "W") {
      console.log(
        `[WARNING] Invalid balanceType '${balanceType}', skipping node.`,
      );
      continue;
    }

    balances.push({
      GLAccountCode: element.attributes["code"],
      GLAccountDescription: accountDescription,
      Amount: +(element.querySelector(`Year[reportingyear='${year}'] > Close`)
        ?.innerText ?? 0),
      AmountCredit:
        +(element.querySelector(`Year[reportingyear='${year}'] > Credit`)
          ?.innerText ?? 0),
      AmountDebit:
        +(element.querySelector(`Year[reportingyear='${year}'] > Debit`)
          ?.innerText ?? 0),
      BalanceType: balanceType,
      ReportingYear: year,
    });
  }

  return balances;
}
