import type { ReportingBalance } from "../repositories/exact_models.d.ts";

export type YearlyReportingBalance = Omit<ReportingBalance, "ReportingPeriod">;

/**
 * @param balances
 * @returns a map from AccountCode to a reporting balance
 */
export function aggregateReportingBalance(balances: ReportingBalance[]) {
  const map: Map<string, YearlyReportingBalance> = new Map();

  for (const balance of balances) {
    const total = map.get(balance.GLAccountCode);

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
