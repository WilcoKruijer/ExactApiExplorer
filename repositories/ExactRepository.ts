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

export default class ExactRepository {
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
      delete (item as Partial<T & ExactApiResponseMeta>)["__metadata"] as unknown as T;
    }

    return data as T[];
  }

  private static async cleanJsonRequest<T>(
    request: (ExactApiRequest & { method: "GET" | "POST" }),
  ): Promise<T[]>;
  private static async cleanJsonRequest<T>(
    request: (ExactApiRequest & { method: "PUT" | "DELETE" }),
  ): Promise<undefined>;
  private static async cleanJsonRequest<T>(request: ExactApiRequest) {
    // @ts-ignore TODO(Wilco)
    const res = await this.api.jsonRequest<T>(request);
    if (!res) {
      return;
    }

    return this.cleanResponse<T>(res);
  }

  static getDivisions() {
    return this.cleanJsonRequest<DivisionResponse>({
      method: "GET",
      resource: "hrm/Divisions",
      select: "Code, Description",
    });
  }
}
