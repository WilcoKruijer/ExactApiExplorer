import Database from "../classes/Database.ts";
import ExactApi, {
  ExactApiNotReadyError,
  ExactApiRequest,
  ExactApiResponseMeta,
} from "../classes/ExactApi.ts";
import SettingRepository from "./SettingRepository.ts";
import SettingService from "../services/SettingService.ts";

const ODATA_DATE_TIME_REGEX = /\/Date\(([0-9]*)\)\//;

/** String in the format /Date(UNIX_TIMESTAMP)/ */
export type ODataDateTime = string;
/** Ex. e0ecaffc-4093-493a-b4db-e9425e8901ba */
export type ODataGuid = string;

export interface DivisionResponse {
  Code: string;
  Description: string;
}

export interface Creator {
  Created: ODataDateTime;
  Creator: ODataGuid;
  CreatorFullName: string;
}

export interface Modifier {
  Modified: ODataDateTime;
  Modifier: ODataGuid;
  ModifierFullName: string;
}

export interface FinancialPeriod extends Creator, Modifier {
  ID: ODataGuid;
  Division: number;
  StartDate: ODataDateTime;
  EndDate: ODataDateTime;
  FinPeriod: number;
  FinYear: number;
}

export interface Account {
  GLAccount: ODataGuid;
  GLAccountCode: string;
  GLAccountDescription: string;
}

export interface AccountClassificationMapping extends Account {
  Classification: ODataGuid;
  ClassificationCode: string;
  ClassificationDescription: string;
  Division: number;
  GLSchemeCode: string;
  GLSchemeDescription: string;
  GLSchemeID: ODataGuid;
  ID: ODataGuid;
}

export enum AccountStatus {
  Open = 20,
  Processed = 50,
}

export interface ReportingBalance extends Account {
  Amount: number;
  AmountCredit: number;
  AmountDebit: number;
  BalanceType: "W" | "B";
  Count: number;
  Division: number;
  ID: string; // Not a guid for some reason.
  ReportingPeriod: number;
  ReportingYear: number;
  // TODO(Wilco): create a type for 'Type'
  //   ref: https://support.exactonline.com/community/s/knowledge-base#All-All-DNO-Reference-restapi-transactiontypesr
  Type: number;
  Status: AccountStatus;
}

export interface RevenueListResponse {
  Year: number;
  Period: number;
  Amount: number;
}

export interface EndpointData {
  service: string;
  endpoint: string;
  url: string;
  methods: ("GET" | "POST" | "PUT" | "DELETE")[];
  scope: string;
}

export default class ExactRepository {
  private static endpointData = ExactRepository.loadEndpointData();
  private static api?: ExactApi = undefined;

  #settingRepo;

  constructor(db: Database) {
    this.#settingRepo = new SettingRepository(db);
  }

  get api(): ExactApi {
    if (!ExactRepository.api) {
      throw new ExactApiNotReadyError("Api not yet constructed.");
    }

    return ExactRepository.api;
  }

  public constructApi(redirectUrl: string) {
    // TODO(Wilco): are we ending up with multiple ExactApi instances?

    const apiStorage = SettingService.settingsToExactStorage(
      this.#settingRepo.getExactStorageSettings(),
    );

    if (!apiStorage) {
      return;
    }

    ExactRepository.api = new ExactApi({
      exactTLD: "nl",
      redirectUrl,
    }, apiStorage);

    ExactRepository.api.setStorageCallback = (storage) => {
      const settings = SettingService.exactStorageToSettings(
        storage,
      );
      this.#settingRepo.setAll(settings);
      // console.log(">>> Saving Exact Storage to DISK.");
    };
  }

  private static loadEndpointData(): EndpointData[] {
    return JSON.parse(
      Deno.readTextFileSync("./resources/exact_endpoints.json"),
    );
  }

  public static get endpoints(): string[] {
    const prefix = "/api/v1/{division}/";
    return ExactRepository.endpointData.map((d) => d.url)
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

  public getReportingBalance(year: number) {
    const searchParams = new URLSearchParams({
      $select:
        "Amount, AmountCredit, AmountDebit, BalanceType, Count, Division, " +
        "GLAccount, GLAccountCode, GLAccountDescription, ID, ReportingPeriod, " +
        "ReportingYear, Type, Status",
      $filter: `ReportingYear eq ${year}`,
      $orderby: "GLAccountDescription asc",
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
    request: (ExactApiRequest & { method: "GET" | "POST" }),
  ): Promise<T[]>;
  public async cleanJsonRequest<T>(
    request: (ExactApiRequest & { method: "PUT" | "DELETE" }),
  ): Promise<undefined>;
  public async cleanJsonRequest<T>(
    request: (ExactApiRequest),
  ): Promise<T[] | undefined>;
  public async cleanJsonRequest<T>(
    request: ExactApiRequest,
  ) {
    const res = await this.api.jsonRequest<T>(request);
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
