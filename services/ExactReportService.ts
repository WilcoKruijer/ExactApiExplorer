import { ReportingBalance } from "../repositories/ExactRepository.ts";

export type YearlyReportingBalance = Omit<ReportingBalance, "ReportingPeriod">;

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
  }

  return map;
}
