import {
  ExactApiNotReadyError,
  ExactApiRequest,
  ExactApiResponseMeta,
} from "../classes/ExactApi.ts";
import { exactApi } from "../main.ts";

type DivisionResponse = {
  Code: string;
  Description: string;
};

type EndpointData = {
  service: string;
  endpoint: string;
  url: string;
  methods: ("GET" | "POST" | "PUT" | "DELETE")[];
  scope: string;
};

const endpointData: EndpointData[] = JSON.parse(
  await Deno.readTextFile("./resources/exact_endpoints.json"),
);

export default class ExactRepository {
  public static get endpoints(): string[] {
    const prefix = "/api/v1/{division}/";
    return endpointData.map((d) => d.url)
      .filter((url) => url.startsWith(prefix))
      .map((url) => url.slice(prefix.length));
  }

  public static getDivisions() {
    return this.cleanJsonRequest<DivisionResponse>({
      method: "GET",
      resource: "hrm/Divisions",
      select: "Code, Description",
    });
  }

  public static getDivisionByCode(code: number) {
    return this.cleanJsonRequest<DivisionResponse>({
      method: "GET",
      resource: "hrm/Divisions",
      select: "Code, Description",
      filter: `Code eq ${code}`,
    });
  }

  public static async cleanJsonRequest<T>(
    request: (ExactApiRequest & { method: "GET" | "POST" }),
  ): Promise<T[]>;
  public static async cleanJsonRequest<T>(
    request: (ExactApiRequest & { method: "PUT" | "DELETE" }),
  ): Promise<undefined>;
  public static async cleanJsonRequest<T>(
    request: (ExactApiRequest),
  ): Promise<T[] | undefined>;
  public static async cleanJsonRequest<T>(request: ExactApiRequest) {
    const res = await this.api.jsonRequest<T>(request);
    if (!res) {
      return;
    }

    return this.cleanResponse<T>(res);
  }

  private static get api() {
    if (!exactApi) {
      throw new ExactApiNotReadyError("exactApi not set.");
    }

    return exactApi;
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
    }

    return data as T[];
  }
}
