import { DOMParser } from "../deps.ts";

import type { XMLBalancesResponse } from "../repositories/ExactRepository.ts";
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
  const document = new DOMParser().parseFromString(response, "text/xml");

  if (!document) {
    throw new Error("Document is empty.");
  }

  const balanceNodes = document.querySelectorAll("balance");
  const balances: XMLBalance[] = [];

  for (const element of balanceNodes) {
    const accountDescription = element.querySelector("description")?.innerText;
    const balanceType = element.getAttribute("balanceType");

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
      GLAccountCode: element.getAttribute("code"),
      GLAccountDescription: accountDescription,
      Amount: +(element.querySelector(`year[ReportingYear='${year}'] > close`)
        ?.innerText ?? 0),
      AmountCredit:
        +(element.querySelector(`year[ReportingYear='${year}'] > credit`)
          ?.innerText ?? 0),
      AmountDebit:
        +(element.querySelector(`year[ReportingYear='${year}'] > debit`)
          ?.innerText ?? 0),
      BalanceType: balanceType,
      ReportingYear: year,
    });
  }

  return balances;
}
