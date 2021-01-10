const AUTH_URL = "https://start.exactonline.nl/api/oauth2/auth/";
const REST_URL = "https://start.exactonline.nl/api/";
const TOKEN_URL = "https://start.exactonline.nl/api/oauth2/token/";

export class ExactOnlineUnavailableError extends Error {
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

export default class ExactApi {
  #options: ExactApiOptions;
  constructor(options: ExactApiOptions) {
    this.#options = options;
  }

  async requestToken(code: string) {
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

    console.log(
      "requested with code",
      this.#options.clientId,
      this.#options.clientSecret,
    );

    if (!response.ok) {
      console.error(await response.text());
      throw new ExactOnlineUnavailableError("Requesting token failed.");
    }

    const tokenData = await response.json();
    const expiresIn = +tokenData["expires_in"];

    this.#options.accessExpiry = Date.now() + expiresIn;
    this.#options.accessToken = tokenData["access_token"];
    this.#options.refreshToken = tokenData["refresh_token"];
  }

  get options(): ExactApiOptions {
    // Make a copy
    return { ...this.#options };
  }

  redirectUrl() {
    return this.options.baseUrl + "/admin/exact/oauth/success";
  }

  authRequestUrl() {
    const params = new URLSearchParams();
    params.set("client_id", this.options.clientId);
    params.set("redirect_uri", this.redirectUrl());
    params.set("response_type", "code");

    return new URL(AUTH_URL + "?" + params.toString()).toString();
  }
}
