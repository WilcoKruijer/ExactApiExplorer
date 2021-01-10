const AUTH_URL = "https://start.exactonline.nl/api/oauth2/auth/";
const REST_URL = "https://start.exactonline.nl/api/";
const TOKEN_URL = "https://start.exactonline.nl/api/oauth2/token/";

const ITERATION_LIMIT = 50;

export class ExactOnlineServiceError extends Error {
  name = "ExactOnlineServiceError";
  exactResponse: Record<string, unknown>;
  constructor(message: string, exactResponse: Record<string, unknown> = {}) {
    super(message);
    this.exactResponse = exactResponse;
  }
}

export class ExactApiNotReadyError extends Error {
  name = "ExactApiNotReadyError";
  constructor(message: string) {
    super(message);
  }
}

export class ExactApiIterationLimit extends Error {
  name = "ExactApiIterationLimit";
  constructor(message: string) {
    super(message);
  }
}

export interface ExactApiOptions {
  baseUrl: string;
  clientId: string;
  clientSecret: string;

  // Only set when a token has been requested.
  code?: string;
  accessExpiry?: number;
  accessToken?: string;
  refreshToken?: string;

  division?: string;
}

type RestMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface ExactApiRequest {
  method: RestMethod;
  resource: string;
  body?: Record<string, unknown>;
  filter?: string;
  select?: string;
  top?: string;
}

type ObjectArray = Array<Record<string, unknown>>;

interface ExactApiResponse {
  d: {
    results: ObjectArray;
    __next: string;
  } | ObjectArray;
}

export default class ExactApi {
  #options: ExactApiOptions;
  setTokenCallback?: (options: ExactApiOptions) => void;

  constructor(options: ExactApiOptions) {
    this.#options = options;
  }

  /**
   * Gets an access and refresh token from Exact.
   * This is needed before Exact APIs can be used.
   * @param code the code gotton from the redirect after logging into Exact.
   */
  public async requestToken(code: string) {
    const params = new URLSearchParams();
    params.set("client_id", this.#options.clientId);
    params.set("client_secret", this.#options.clientSecret);
    params.set("code", code);
    params.set("grant_type", "authorization_code");
    params.set("redirect_uri", this.redirectUrl());

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

  public async available(): Promise<number> {
    const response = await this.rawRequest({
      method: "GET",
      resource: "v1/current/Me",
      select: "CurrentDivision",
    });

    if (!response.ok) {
      return 0;
    }

    const res = await this.retrievePaginatedResponse(await response.json());

    if (!res.length) {
      return 0;
    }

    return res[0]["CurrentDivision"] as number;
  }

  public get options(): ExactApiOptions {
    // Make a copy
    return { ...this.#options };
  }

  public redirectUrl() {
    return this.options.baseUrl + "/admin/exact/oauth/success";
  }

  public authRequestUrl() {
    const params = new URLSearchParams();
    params.set("client_id", this.options.clientId);
    params.set("redirect_uri", this.redirectUrl());
    params.set("response_type", "code");

    return new URL(AUTH_URL + "?" + params.toString()).toString();
  }

  private async retrievePaginatedResponse(
    exactResponse: ExactApiResponse,
  ): Promise<ObjectArray> {
    let d = exactResponse["d"];

    if (Array.isArray(d)) {
      // Sometimes d is an array instead of an object. This means there are
      // no more pages.
      return d;
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

    return results;
  }

  private buildRequestParameters(request: ExactApiRequest) {
    const params = new URLSearchParams();

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

    const params = this.buildRequestParameters(request);

    const url = new URL(REST_URL + request.resource + "?" + params.toString());

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

    if (this.setTokenCallback) {
      this.setTokenCallback(this.options);
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
