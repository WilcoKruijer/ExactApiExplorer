import { ReportingBalance } from "../repositories/ExactRepository.ts";

export type YearlyReportingBalance = Omit<ReportingBalance, "ReportingPeriod">;

export function aggregateReportingBalance(balances: ReportingBalance[]) {
  const map: Map<string, YearlyReportingBalance> = new Map();
  // const map: Map<string, ReportingBalance> = new Map();

  for (const balance of balances) {
    const total = map.get(balance.GLAccountCode);

    if (!total) {
      // deno-lint-ignore no-explicit-any
      delete (balance as any).ReportingPeriod;
      map.set(balance.GLAccountCode, balance);
      continue;
    }

    total.Amount += balance.Amount;
    total.AmountCredit += total.AmountCredit;
    total.AmountDebit += total.AmountDebit;
    total.Count += total.Count;
  }

  return map;
}
