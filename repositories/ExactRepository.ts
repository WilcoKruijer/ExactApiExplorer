import ExactApi, {
  ExactApiRequestRest,
  ExactApiResponseMeta,
} from "../classes/ExactApi.ts";
import type {
  Account,
  AccountClassification,
  AccountClassificationMapping,
  BudgetScenario,
  BudgetScenarioValue,
  DivisionResponse,
  FinancialPeriod,
  ODataDateTime,
  ODataGuid,
  ReportingBalance,
  RevenueListResponse,
  TransactionLine,
} from "./exact_models.d.ts";
import exactEndpointData from "../resources/exact_endpoints.ts";

export type XMLBalancesResponse = string;

const ODATA_DATE_TIME_REGEX = /\/Date\(([0-9]*)\)\//;

export default class ExactRepository {
  #api;

  constructor(api: ExactApi) {
    this.#api = api;
  }

  get api(): ExactApi {
    return this.#api;
  }

  public static get endpoints(): string[] {
    const prefix = "/api/v1/{division}/";
    return exactEndpointData.map((d) => d.url)
      .filter((url) => url.startsWith(prefix))
      .map((url) => url.slice(prefix.length));
  }

  public static convertDate(oDataDateTime: ODataDateTime): Date {
    const match = oDataDateTime.match(ODATA_DATE_TIME_REGEX);

    if (!match) {
      throw new TypeError("Invalid ODataDateTime.");
    }

    return new Date(+match[1]);
  }

  // deno-lint-ignore no-explicit-any
  public static convertDatesInResponse(resp: any) {
    if (!resp || typeof resp !== "object") {
      return;
    }

    for (const [key, value] of Object.entries(resp)) {
      if (typeof value !== "string") {
        continue;
      }

      try {
        if (key in resp) {
          resp[key] = ExactRepository.convertDate(value);
        }
      } catch (e) {
        if (!(e instanceof TypeError)) {
          throw e;
        }
      }
    }
  }

  public getAccountClassificationMappings() {
    return this.cleanJsonRequest<AccountClassificationMapping>({
      method: "GET",
      resource: `financial/GLAccountClassificationMappings`,
    });
  }

  public getAccountClassifications() {
    return this.cleanJsonRequest<AccountClassification>({
      method: "GET",
      resource: `financial/GLClassifications`,
    });
  }

  public getBudgetScenario(descriptionFilter = "", top = 25) {
    const searchParams = new URLSearchParams({
      $orderby: "Description asc",
    });

    return this.cleanJsonRequest<BudgetScenario>({
      method: "GET",
      resource: "budget/BudgetScenarios",
      betaRoute: true,
      filter: `startswith(Description, '${descriptionFilter}')`,
      select: "ID, Code, Description, Division, FromYear, ToYear",
      top: top + "",
      searchParams,
    });
  }

  public getBudgetScenarioValues(budget: ODataGuid) {
    return this.cleanJsonRequest<BudgetScenarioValue>({
      method: "GET",
      resource: "budget/Budgets",
      filter: `BudgetScenario eq guid'${budget}'`,
      select:
        "BudgetScenario, BudgetScenarioCode, BudgetScenarioDescription, AmountDC, ReportingYear, " +
        "ReportingPeriod, GLAccount, GLAccountCode, GLAccountDescription",
    });
  }

  public getAccounts(descriptionFilter: string, top = 25) {
    const searchParams = new URLSearchParams({
      $orderby: "Description asc",
    });

    return this.cleanJsonRequest<Account>({
      method: "GET",
      resource: `financial/GLAccounts`,
      filter:
        `startswith(Description, '${descriptionFilter}') and IsBlocked eq false`,
      top: top + "",
      searchParams,
    });
  }

  public getTransactionLines(accountGuid: ODataGuid, year: number) {
    const searchParams = new URLSearchParams({
      $orderby: "Date asc",
    });

    return this.cleanJsonRequest<TransactionLine>({
      method: "GET",
      resource: `bulk/Financial/TransactionLines`,
      filter: `GLAccount eq guid'${accountGuid}' and FinancialYear eq ${year}`,
      select:
        "Account, AccountCode, AccountName, AmountDC, AmountFC, AmountVATBaseFC, AmountVATFC, " +
        "CostCenter, CostCenterDescription, Currency, Date, DueDate, Description, Document, DocumentNumber, " +
        "DocumentSubject, EntryID, EntryNumber, FinancialPeriod, FinancialYear, InvoiceNumber, JournalCode, " +
        "JournalDescription, LineNumber, LineType, Notes, Status, VATCode, VATCodeDescription, VATPercentage, " +
        "VATType, YourRef, Type, GLAccount, GLAccountCode, GLAccountDescription",
      searchParams,
    });
  }

  public getXMLBalance(year: number): Promise<XMLBalancesResponse> {
    const searchParams = new URLSearchParams({
      Topic: "Balances",
      Params_Year: year.toString(),
      Params_AfterEntry: true.toString(),
    });

    return this.api.xmlRequest({
      type: "XML",
      method: "GET",
      searchParams,
    });
  }

  public getReportingBalance(year: number) {
    const searchParams = new URLSearchParams({
      $select:
        "Amount, AmountCredit, AmountDebit, BalanceType, Count, Division, " +
        "GLAccount, GLAccountCode, GLAccountDescription, ID, ReportingPeriod, " +
        "ReportingYear, Type, Status",
      $filter: `ReportingYear eq ${year} and BalanceType eq 'W'`,
      $orderby: "GLAccountDescription asc, ReportingPeriod asc",
    });
    return this.cleanJsonRequest<ReportingBalance>({
      method: "GET",
      resource: `financial/ReportingBalance`,
      searchParams,
    });
  }

  public getRevenueListByYearAndStatus(year: number) {
    const searchParams = new URLSearchParams({
      $orderby: "Period asc",
      year: year.toString(),
      afterEntry: true.toString(),
    });
    return this.cleanJsonRequest<RevenueListResponse>({
      method: "GET",
      resource: `read/financial/RevenueListByYear`,
      searchParams,
    });
  }

  public getFinancialPeriods(year: number) {
    const searchParams = new URLSearchParams({
      $filter: `FinYear eq ${year}`,
      $orderby: "StartDate asc",
    });
    return this.cleanJsonRequest<FinancialPeriod>({
      method: "GET",
      resource: `financial/FinancialPeriods`,
      searchParams,
    });
  }

  public getDivisions() {
    return this.cleanJsonRequest<DivisionResponse>({
      method: "GET",
      resource: "hrm/Divisions",
      select: "Code, Description",
    });
  }

  public getDivisionByCode(code: number) {
    return this.cleanJsonRequest<DivisionResponse>({
      method: "GET",
      resource: "hrm/Divisions",
      select: "Code, Description",
      filter: `Code eq ${code}`,
    });
  }

  public async cleanJsonRequest<T>(
    request: (Omit<ExactApiRequestRest, "type"> & { method: "GET" | "POST" }),
  ): Promise<T[]>;
  public async cleanJsonRequest<T>(
    request: (Omit<ExactApiRequestRest, "type"> & { method: "PUT" | "DELETE" }),
  ): Promise<undefined>;
  public async cleanJsonRequest<T>(
    request: (Omit<ExactApiRequestRest, "type">),
  ): Promise<T[] | undefined>;
  public async cleanJsonRequest<T>(
    request: Omit<ExactApiRequestRest, "type">,
  ) {
    const res = await this.api.jsonRequest<T>({
      type: "REST",
      ...request,
    });

    if (!res) {
      return;
    }

    return ExactRepository.cleanResponse<T>(res);
  }

  private static cleanResponse<T>(
    data: undefined,
  ): undefined;
  private static cleanResponse<T>(
    data: (T & ExactApiResponseMeta)[],
  ): T[];
  private static cleanResponse<T>(
    data: (T & ExactApiResponseMeta)[] | undefined,
  ) {
    if (!data) {
      return;
    }

    for (const item of data) {
      delete (item as Partial<T & ExactApiResponseMeta>)[
        "__metadata"
      ] as unknown as T;

      ExactRepository.convertDatesInResponse(item);
    }

    return data as T[];
  }
}
