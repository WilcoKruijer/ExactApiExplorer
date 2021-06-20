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
  Code: string;
  Description: string;
};

type RevenueListResponse = {
  Year: number;
  Period: number;
  Amount: number;
};

type EndpointData = {
  service: string;
  endpoint: string;
  url: string;
  methods: ("GET" | "POST" | "PUT" | "DELETE")[];
  scope: string;
};

export default class ExactRepository {
  private static endpointData = ExactRepository.loadEndpointData();
  private static api?: ExactApi = undefined;

  #db;
  #settingRepo;

  constructor(db: Database) {
    this.#db = db;
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
  public getRevenueListByYearAndStatus(year: number) {
    const searchParams = new URLSearchParams({
      year: year.toString(),
      afterEntry: true.toString(),
    });
    return this.cleanJsonRequest<RevenueListResponse>({
      method: "GET",
      resource: `read/financial/RevenueListByYear`,
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
