import ExactApi, { ExactApiOptions } from "../classes/ExactApi.ts";
import {
  ansi,
  colors,
  Confirm,
  Input,
  link,
  prompt,
  serve,
  Toggle,
} from "../deps.ts";
import type { Setting } from "../repositories/SettingRepository.ts";
import SettingRepository from "../repositories/SettingRepository.ts";
import SettingService from "../services/SettingService.ts";

const BASE_URL = "http://localhost:8080";

const enum Prompts {
  MAKE_APP = "confirmedMakeApp",
  CLIENT_ID = "clientId",
  CLIENT_SECRET = "clientSecret",
  PICK_DIVISION = "division",
}

let clientId: string;
let clientSecret: string;
let exactApi: ExactApi;

function initializeExactApi(apiOptions: ExactApiOptions) {
  if (exactApi) {
    return;
  }

  exactApi = new ExactApi(apiOptions);
  exactApi.setTokenCallback = (options) => {
    const settings = SettingService.exactOptionsToSettings(
      exactApi.options,
    );
    SettingRepository.setAll(settings);
    console.log("Saved ExactApiOptions to disk.");
  };
}

export async function runExactSetup() {
  //available

  const apiOptions = SettingService.settingsToExactOptions(
    SettingRepository.getExactStorageSettings(),
  );

  let division = 0;
  if (apiOptions) {
    initializeExactApi(apiOptions);

    try {
      division = await exactApi.available();
    } catch (error) {
      if (
        error.name !== "ExactApiNotReadyError" &&
        error.name !== "ExactOnlineServiceError"
      ) {
        throw error;
      }
      console.error(error.message, error.exactResponse);
    }
  }

  console.log("API available?", division);

  await prompt([
    {
      name: Prompts.MAKE_APP,
      message: "Have you successfully made an app?",
      type: Toggle,
      before: (_, next) => {
        console.log(
          colors.bold("[1] Create Exact App\n") +
            colors.gray(
              "In this step you will create an App in the app center and enter its details.\n\n",
            ) +
            "\t- Register an app at " +
            link("apps.exactonline.com", "https://apps.exactonline.com/") +
            "\n" +
            "\t- Enter the following into the 'Redirect URI' field: " +
            colors.italic(BASE_URL) +
            "\n",
        );

        next();
      },
      after: ({ confirmedMakeApp }, next) => {
        next(confirmedMakeApp ? undefined : Prompts.MAKE_APP);
      },
    },
    {
      name: Prompts.CLIENT_ID,
      message: "Please enter the Client ID:",
      type: Input,
      after: (answer, next) => {
        if (!answer.clientId) {
          next(Prompts.CLIENT_ID);
        }
        clientId = answer.clientId!;
        next();
      },
    },
    {
      name: Prompts.CLIENT_SECRET,
      message: "Please enter the Client Secret:",
      type: Input,
      after: (answer, next) => {
        if (!answer.clientSecret) {
          next(Prompts.CLIENT_SECRET);
        }
        clientSecret = answer.clientSecret!;
        next();
      },
    },
    {
      name: Prompts.PICK_DIVISION,
      message: "Please select a division",
      type: Input,
      before: async (_, next) => {
        initializeExactApi({
          baseUrl: BASE_URL,
          clientId: clientId,
          clientSecret: clientSecret,
        });

        const url = exactApi.authRequestUrl();

        console.log(
          colors.bold("[2] Login to Exact.\n") +
            "Please go to the following URL and login:\n" +
            colors.gray("\t" + link(url, url)),
        );

        const code = await startWebServer();

        await exactApi.requestToken(code!);

        console.log("All done.");

        const division = await exactApi.available();

        console.log("API available?", division);

        // await next();
      },
    },
  ]);
}

export async function startWebServer() {
  const server = serve({ hostname: "0.0.0.0", port: 8080 });

  for await (const request of server) {
    const code = new URL(request.url, BASE_URL).searchParams.get("code");
    request.respond({
      status: 200,
      body: `
    <html>
    <body>
    You can close this page now ;)
    `,
    });
    return code;
  }
}
