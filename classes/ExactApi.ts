const INCOMPLETE_EXACT_URL = "https://start.exactonline.";
const AUTH_PATH = "/api/oauth2/auth/";
const REST_PATH = "/api/";
const XML_POST_PATH = "/docs/XMLUpload.aspx";
const XML_GET_PATH = "/docs/XMLDownload.aspx";
const TOKEN_PATH = "/api/oauth2/token/";

// TODO(Wilco): make iteration limit adjustable as well.
const ITERATION_LIMIT = 30;

/** Thrown when the API returns an error message. */
export class ExactOnlineServiceError extends Error {
  name = "ExactOnlineServiceError";
  exactResponse?: Record<string, unknown> | string;
  constructor(message: string, exactResponse?: ExactApiErrorResponse | string) {
    let msg = message;

    if (typeof exactResponse === "object") {
      if (exactResponse?.error?.message?.value) {
        msg += "\n" + exactResponse.error.message.value;
      }
    } else if (typeof exactResponse === "string") {
      msg += "\n" + exactResponse;
    }

    super(msg);
    this.exactResponse = exactResponse;
  }
}

/** Thrown when the setup steps are not completed. */
export class ExactApiNotReadyError extends Error {
  name = "ExactApiNotReadyError";
  constructor(message: string) {
    super(message);
  }
}

/**
 * Thrown when pagination goes over the iteration limit.
 * In the Exact API, each page is a new request.
 */
export class ExactApiIterationLimit extends Error {
  name = "ExactApiIterationLimit";
  constructor(message: string) {
    super(message);
  }
}

export type ExactTLD = "nl" | "be" | "fr" | "de" | "es" | "co.uk" | "com";

export interface ExactApiOptions {
  redirectUrl: string;
  exactTLD: ExactTLD;
}

/** Persistant data the API requires. */
export interface ExactApiStorage {
  clientId: string;
  clientSecret: string;

  // Only set when a token has been requested.
  code?: string;
  accessExpiry?: number;
  accessToken?: string;
  refreshToken?: string;

  division?: number;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

/** Options for requesting data from the api. */
export interface ExactApiRequestBase {
  method: HttpMethod;
  type: "REST" | "XML";
  searchParams?: URLSearchParams;
  body?: Record<string, unknown> | string;
}

export interface ExactApiRequestRest extends ExactApiRequestBase {
  method: HttpMethod;
  resource: string;
  type: "REST";
  body?: Record<string, unknown>;
  filter?: string;
  select?: string;
  top?: string;
}

export interface ExactApiRequestXML extends ExactApiRequestBase {
  type: "XML";
  body?: string;
}

export type ExactApiRequest =
  | ExactApiRequestRest
  | ExactApiRequestXML;

/** Response wrapper for a raw API response */
export interface ExactApiResponse<T> {
  d: {
    results: T[];
    __next: string; // url to next page of this response
  } | T[];
}

/** Metadata returned with each API call. */
export interface ExactApiResponseMeta {
  __metadata: {
    uri: string;
    type: string;
  };
}

export interface ExactApiErrorResponse extends Record<string, unknown> {
  error?: {
    code: string;
    message?: {
      lang: string;
      value?: string;
    };
  };
}

type MeResponse = { CurrentDivision: number };

/** Class that aids interaction with the Exact Online API. */
export default class ExactApi {
  #storage: ExactApiStorage;
  #options: ExactApiOptions;

  /**
   * Function that gets called when any of the storage change.
   * Use this for persisting data used by the API to your storage of choice.
   */
  setStorageCallback?: (storage: ExactApiStorage) => void;

  constructor(options: ExactApiOptions, storage: ExactApiStorage) {
    this.#options = options;
    this.#storage = storage;
  }

  /**
   * Gets an access and refresh token from Exact.
   * This is needed before Exact APIs can be used.
   * @param code the code gotten from the redirect after logging into Exact.
   */
  public async requestToken(code: string) {
    const params = new URLSearchParams();
    params.set("client_id", this.#storage.clientId);
    params.set("client_secret", this.#storage.clientSecret);
    params.set("code", code);
    params.set("grant_type", "authorization_code");
    params.set("redirect_uri", this.#options.redirectUrl);

    const response = await fetch(this.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (!response.ok) {
      throw new ExactOnlineServiceError(
        "Requesting token failed.",
        await response.json(),
      );
    }

    this.setToken(await response.json());
  }

  /**
   * Gets the currently selected division from the API and stores it.
   * Returns the current selected division when available. A return value of
   * null means the API is not ready for querying.
   */
  public async retrieveDivision(): Promise<number | undefined> {
    const response = await this.rawJSONRequest({
      type: "REST",
      method: "GET",
      resource: "v1/current/Me",
      select: "CurrentDivision",
    });

    if (!response.ok) {
      return;
    }

    const res = await this.retrievePaginatedResponse<MeResponse>(
      await response.json(),
    );

    if (!res.length) {
      return;
    }

    const division = res[0].CurrentDivision;

    // Only update division when we don't currently have a division set
    if (!this.division) {
      this.division = division;
    }

    return division;
  }

  /**
   * Query the Exact API.
   * Handles paginating by requesting all pages until the iteration limit is reached.
   */
  public async jsonRequest<T>(
    request: (ExactApiRequestRest & { method: "GET" | "POST" }),
  ): Promise<(T & ExactApiResponseMeta)[]>;
  public async jsonRequest<T>(
    request: (ExactApiRequestRest & { method: "PUT" | "DELETE" }),
  ): Promise<undefined>;
  public async jsonRequest<T>(
    request: (ExactApiRequestRest),
  ): Promise<(T & ExactApiResponseMeta)[] | undefined>;
  public async jsonRequest<T>(
    request: ExactApiRequestRest,
  ) {
    this.ensureDivision(this.#storage.division);

    request = {
      ...request,
      resource: `v1/${this.#storage.division}/${request.resource}`,
    };

    const response = await this.rawJSONRequest(request);

    if (!response.ok) {
      throw new ExactOnlineServiceError(
        "JSON request failed.",
        await response.json(),
      );
    }

    if (request.method === "DELETE" || request.method === "PUT") {
      return undefined;
    }

    return this.retrievePaginatedResponse<T>(await response.json());
  }

  private ensureDivision(
    _division?: number,
  ): asserts _division is NonNullable<number> {
    if (!this.#storage.division) {
      throw new ExactApiNotReadyError(
        "Division has not been set. Call retrieveDivision() first.",
      );
    }
  }

  public async xmlRequest(request: ExactApiRequestXML) {
    this.ensureDivision(this.#storage.division);

    const response = await this.rawXMLRequest(request);

    if (!response.ok) {
      throw new ExactOnlineServiceError(
        "XML request failed.",
        await response.text(),
      );
    }

    return response.text();
  }

  /** Returns a copy of the current storage. */
  public get storage(): ExactApiStorage {
    // Make a copy
    return { ...this.#storage };
  }

  /** Gets the current division. Undefined means the API is not yet ready. */
  public get division(): number | undefined {
    return this.#storage.division;
  }

  /**
   * Sets the division API calls are directed to.
   * This does not verify if the division actually exist.
   */
  public set division(division: number | undefined) {
    if (typeof division === "undefined") {
      throw new TypeError("Cannot set division to 'undefined'.");
    }

    if (this.setStorageCallback && this.#storage.division !== division) {
      // Division has changed, it should be stored.
      this.#storage.division = division;
      this.setStorageCallback(this.storage);
    }
  }

  /** Builds the URL to user login page. */
  public get authRequestUrl() {
    const params = new URLSearchParams();
    params.set("client_id", this.storage.clientId);
    params.set("redirect_uri", this.#options.redirectUrl);
    params.set("response_type", "code");

    return new URL(this.authBaseUrl + "?" + params.toString()).toString();
  }

  public buildRestUrl(request: ExactApiRequestRest) {
    const params = ExactApi.buildRequestParameters(request);
    const paramsString = params.toString() ? "?" + params.toString() : "";

    return new URL(
      this.restBaseUrl + request.resource + paramsString,
    );
  }

  public buildXmlUrl(request: ExactApiRequestXML) {
    this.ensureDivision(this.#storage.division);

    const params = request.searchParams ?? new URLSearchParams();

    if (!params.get("_Division_")) {
      params.set("_Division_", this.#storage.division.toString());
    }

    const paramsString = params.toString() ? "?" + params.toString() : "";

    if (request.method === "GET") {
      return new URL(this.XMLDownloadUrl + paramsString);
    } else if (request.method === "POST") {
      return new URL(this.XMLUploadUrl + paramsString);
    } else {
      throw new TypeError(
        "Cannot build URL for XML request that is neither GET nor POST.",
      );
    }
  }

  public get authBaseUrl() {
    return INCOMPLETE_EXACT_URL + this.#options.exactTLD + AUTH_PATH;
  }

  public get restBaseUrl() {
    return INCOMPLETE_EXACT_URL + this.#options.exactTLD + REST_PATH;
  }

  public get XMLDownloadUrl() {
    return INCOMPLETE_EXACT_URL + this.#options.exactTLD + XML_GET_PATH;
  }

  public get XMLUploadUrl() {
    return INCOMPLETE_EXACT_URL + this.#options.exactTLD + XML_POST_PATH;
  }

  public get tokenUrl() {
    return INCOMPLETE_EXACT_URL + this.#options.exactTLD + TOKEN_PATH;
  }

  private async retrievePaginatedResponse<T>(
    exactResponse: ExactApiResponse<T & ExactApiResponseMeta>,
  ): Promise<(T & ExactApiResponseMeta)[]> {
    let d = exactResponse["d"];

    if (Array.isArray(d)) {
      // Sometimes d is an array instead of an object. This means there are
      // no more pages.
      return d as (T & ExactApiResponseMeta)[];
    }

    const results = d["results"];
    let iteration = 0;

    while ("__next" in d) {
      if (iteration > ITERATION_LIMIT) {
        throw new ExactApiIterationLimit("Limit reached.");
      }

      // Strip base url from the url the api returned
      const nextUrl: string = d.__next.substring(this.restBaseUrl.length);

      // TODO(Wilco): Is 'GET' always the right method here?
      const response = await this.rawJSONRequest({
        type: "REST",
        method: "GET",
        resource: nextUrl,
      });

      if (!response.ok) {
        throw new ExactOnlineServiceError(
          "Retrieve pagination failed",
          await response.json(),
        );
      }

      d = (await response.json())["d"];

      if ("results" in d) {
        results.push(...d["results"]);
      }

      iteration += 1;
    }

    return results as (T & ExactApiResponseMeta)[];
  }

  private static buildRequestParameters(request: ExactApiRequestRest) {
    const params = request.searchParams ?? new URLSearchParams();

    if (request.select) {
      params.set("$select", request.select);
    }

    if (request.filter) {
      params.set("$filter", request.filter);
    }

    if (request.top) {
      params.set("$top", request.top);
    }

    return params;
  }

  private async rawJSONRequest(request: ExactApiRequestRest) {
    if (
      typeof request.body !== "undefined" && typeof request.body !== "object"
    ) {
      throw new TypeError(
        "Expected no body or a Record<> body for REST request.",
      );
    }

    await this.refreshTokenIfNeeded();

    const url = this.buildRestUrl(request);

    const fetchObject: RequestInit = {
      method: request.method,
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${this.#storage.accessToken}`,
      },
      body: request.body ? JSON.stringify(request.body) : undefined,
    };

    let response = await fetch(url, fetchObject);

    if (response.status === 401) {
      // Our token might just have expired. Simply try again
      await this.refreshTokenIfNeeded();
      response = await fetch(url, fetchObject);
    }

    return response;
  }

  private async rawXMLRequest(request: ExactApiRequestXML) {
    await this.refreshTokenIfNeeded();

    const url = this.buildXmlUrl(request);

    const fetchObject: RequestInit = {
      method: request.method,
      headers: {
        "Accept": "application/xml",
        "Authorization": `Bearer ${this.#storage.accessToken}`,
      },
      body: request.body,
    };

    let response = await fetch(url, fetchObject);

    if (response.status === 401) {
      // Our token might just have expired. Simply try again
      await this.refreshTokenIfNeeded();
      response = await fetch(url, fetchObject);
    }

    return response;
  }

  private setToken(tokenData: Record<string, string>) {
    const expiresIn = +tokenData["expires_in"];

    this.#storage.accessExpiry = Date.now() + expiresIn;
    this.#storage.accessToken = tokenData["access_token"];
    this.#storage.refreshToken = tokenData["refresh_token"];

    if (this.setStorageCallback) {
      this.setStorageCallback(this.storage);
    }
  }

  /**
   * Refreshes our current access token if needed.
   */
  private async refreshTokenIfNeeded() {
    if (!this.#storage.refreshToken || !this.#storage.accessExpiry) {
      // We don't have a token yet, we cannot refresh.
      throw new ExactApiNotReadyError(
        "Cannot refresh token without a refresh token.",
      );
    }

    if (Date.now() < this.#storage.accessExpiry) {
      // We have a refresh token and it isn't currently expired.
      // TODO(Wilco): check if having a small offset of a second is useful here.
      return;
    }

    const params = new URLSearchParams();
    params.set("client_id", this.#storage.clientId);
    params.set("client_secret", this.#storage.clientSecret);
    params.set("grant_type", "refresh_token");
    params.set("refresh_token", this.#storage.refreshToken);

    const response = await fetch(this.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (!response.ok) {
      throw new ExactOnlineServiceError(
        "Requesting refresh token failed.",
        await response.json(),
      );
    }

    this.setToken(await response.json());
  }
}
