import { assertEquals } from "../deps.ts";
import type { ReportingBalance } from "../repositories/exact_models.d.ts";
import { aggregateReportingBalance } from "../services/ExactReportService.ts";

Deno.test("Correctly aggregate reporting balance.", () => {
  const fixture: ReportingBalance[] = [
    {
      Amount: 50,
      AmountDebit: 50,
      AmountCredit: 0,
      BalanceType: "W",
      Count: 1,
      ID: "asd",
      ReportingPeriod: 1,
      ReportingYear: 2020,
      Division: 123123,
      Type: 90,
      Status: 50,
      GLAccount: "e0ecaffc-4093-493a-b4db-e9425e8901ba",
      GLAccountCode: "8000",
      GLAccountDescription: "Free Money",
    },
    {
      Amount: -20,
      AmountDebit: 10,
      AmountCredit: 30,
      BalanceType: "W",
      Count: 1,
      ID: "asd",
      ReportingPeriod: 2,
      ReportingYear: 2020,
      Division: 123123,
      Type: 90,
      Status: 50,
      GLAccount: "e0ecaffc-4093-493a-b4db-e9425e8901ba",
      GLAccountCode: "8000",
      GLAccountDescription: "Free Money",
    },
  ];

  const res = aggregateReportingBalance(fixture);
  assertEquals(res.size, 1);
  assertEquals(res.get("8000"), {
    Amount: 30,
    AmountDebit: 60,
    AmountCredit: 30,
    BalanceType: "W",
    Count: 1,
    ID: "asd",
    ReportingYear: 2020,
    Division: 123123,
    Type: 90,
    Status: 50,
    GLAccount: "e0ecaffc-4093-493a-b4db-e9425e8901ba",
    GLAccountCode: "8000",
    GLAccountDescription: "Free Money",
  });
});
