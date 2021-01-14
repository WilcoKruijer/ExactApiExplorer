// TODO(Wilco): allow adjusting these to different TLDs
const AUTH_URL = "https://start.exactonline.nl/api/oauth2/auth/";
const REST_URL = "https://start.exactonline.nl/api/";
const TOKEN_URL = "https://start.exactonline.nl/api/oauth2/token/";

// TODO(Wilco): make iteration limit adjustable as well.
const ITERATION_LIMIT = 50;

/** Thrown when the API returns an error message. */
export class ExactOnlineServiceError extends Error {
  name = "ExactOnlineServiceError";
  exactResponse: Record<string, unknown>;
  constructor(message: string, exactResponse: Record<string, unknown> = {}) {
    super(message);
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

/** Persistant data the API requires. */
export interface ExactApiOptions {
  baseUrl: string;
  clientId: string;
  clientSecret: string;

  // Only set when a token has been requested.
  code?: string;
  accessExpiry?: number;
  accessToken?: string;
  refreshToken?: string;

  division?: number;
}

type RestMethod = "GET" | "POST" | "PUT" | "DELETE";

/** Options for requesting data from the api. */
export interface ExactApiRequest {
  method: RestMethod;
  resource: string;
  searchParams?: URLSearchParams;
  body?: Record<string, unknown>;
  filter?: string;
  select?: string;
  top?: string;
}

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

type MeResponse = { CurrentDivision: number };

/** Class that aids interaction with the Exact Online API. */
export default class ExactApi {
  #options: ExactApiOptions;

  /** 
   * Function that gets called when any of the options change.
   * Use this for persisting data used by the API to your storage of choice.
   */
  setOptionsCallback?: (options: ExactApiOptions) => void;

  constructor(options: ExactApiOptions) {
    this.#options = options;
  }

  /**
   * Gets an access and refresh token from Exact.
   * This is needed before Exact APIs can be used.
   * @param code the code gotten from the redirect after logging into Exact.
   */
  public async requestToken(code: string) {
    const params = new URLSearchParams();
    params.set("client_id", this.#options.clientId);
    params.set("client_secret", this.#options.clientSecret);
    params.set("code", code);
    params.set("grant_type", "authorization_code");
    params.set("redirect_uri", this.#options.baseUrl);

    const response = await fetch(TOKEN_URL, {
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
   * Gets the currently selected revision from the API and stores it.
   * Returns the current selected division when available. A response of
   * 0 means the API is not ready for querying.
   */
  public async retrieveDivision(): Promise<number> {
    const response = await this.rawRequest({
      method: "GET",
      resource: "v1/current/Me",
      select: "CurrentDivision",
    });

    if (!response.ok) {
      return 0;
    }

    const res = await this.retrievePaginatedResponse<MeResponse>(
      await response.json(),
    );

    if (!res.length) {
      return 0;
    }

    const division = res[0].CurrentDivision;

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
    request: (ExactApiRequest & { method: "GET" | "POST" }),
  ): Promise<(T & ExactApiResponseMeta)[]>;
  public async jsonRequest<T>(
    request: (ExactApiRequest & { method: "PUT" | "DELETE" }),
  ): Promise<undefined>;
  public async jsonRequest<T>(
    request: (ExactApiRequest),
  ): Promise<(T & ExactApiResponseMeta)[] | undefined>;
  public async jsonRequest<T>(
    request: ExactApiRequest,
  ) {
    if (!this.#options.division) {
      throw new ExactApiNotReadyError(
        "Division has not been set. Call retrieveDivision() first.",
      );
    }

    request = {
      ...request,
      resource: `v1/${this.#options.division}/${request.resource}`,
    };

    const response = await this.rawRequest(request);

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

  /** Returns a copy of the current options. */
  public get options(): ExactApiOptions {
    // Make a copy
    return { ...this.#options };
  }

  /** Gets the current division. Undefined means the API is not yet ready. */
  public get division(): number | undefined {
    return this.#options.division;
  }

  /** 
   * Sets the division API calls are directed to.
   * This does not verify if the division actually exist. 
   */
  public set division(division: number | undefined) {
    if (typeof division === "undefined") {
      throw new Error("Cannot set division to 'undefined'.");
    }

    if (this.setOptionsCallback && this.#options.division !== division) {
      // Division has changed, it should be stored.
      this.#options.division = division;
      this.setOptionsCallback(this.options);
    }
  }

  /** Builds the URL to user login page. */
  public authRequestUrl() {
    const params = new URLSearchParams();
    params.set("client_id", this.options.clientId);
    params.set("redirect_uri", this.#options.baseUrl);
    params.set("response_type", "code");

    return new URL(AUTH_URL + "?" + params.toString()).toString();
  }

  public static buildUrl(request: ExactApiRequest) {
    const params = ExactApi.buildRequestParameters(request);

    return new URL(REST_URL + request.resource + "?" + params.toString());
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
      const nextUrl: string = d.__next.substring(REST_URL.length);

      // TODO(Wilco): Is 'GET' always the right method here?
      const response = await this.rawRequest({
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

  private static buildRequestParameters(request: ExactApiRequest) {
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

  private async rawRequest(request: ExactApiRequest) {
    await this.refreshTokenIfNeeded();

    const url = ExactApi.buildUrl(request);

    const fetchObject: RequestInit = {
      method: request.method,
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${this.#options.accessToken}`,
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

  private setToken(tokenData: Record<string, string>) {
    const expiresIn = +tokenData["expires_in"];

    this.#options.accessExpiry = Date.now() + expiresIn;
    this.#options.accessToken = tokenData["access_token"];
    this.#options.refreshToken = tokenData["refresh_token"];

    if (this.setOptionsCallback) {
      this.setOptionsCallback(this.options);
    }
  }

  /**
   * Refreshes our current access token if needed.
   */
  private async refreshTokenIfNeeded() {
    if (!this.#options.refreshToken || !this.#options.accessExpiry) {
      // We don't have a token yet, we cannot refresh.
      throw new ExactApiNotReadyError(
        "Cannot refresh token without a refresh token.",
      );
    }

    if (Date.now() < this.#options.accessExpiry) {
      // We have a refresh token and it isn't currently expired.
      // TODO(Wilco): check if having a small offset of a second is useful here.
      return;
    }

    const params = new URLSearchParams();
    params.set("client_id", this.#options.clientId);
    params.set("client_secret", this.#options.clientSecret);
    params.set("grant_type", "refresh_token");
    params.set("refresh_token", this.#options.refreshToken);

    const response = await fetch(TOKEN_URL, {
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
