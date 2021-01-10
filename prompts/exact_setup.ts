import { colors, Input, link, prompt, serve, Toggle } from "../deps.ts";
import SettingRepository from "../repositories/SettingRepository.ts";
import SettingService from "../services/SettingService.ts";
import { createExactApi, exactApi } from "../main.ts";

const BASE_URL = "http://localhost:8080";

const enum Prompts {
  RESET_CONFIRMATION = "resetConfirmed",
  MAKE_APP = "confirmedMakeApp",
  CLIENT_ID = "clientId",
  CLIENT_SECRET = "clientSecret",
}

let clientId: string;

export async function runExactSetup(doConfirm = false) {
  await prompt([
    {
      name: Prompts.RESET_CONFIRMATION,
      message:
        "Are you sure you want to reset your existing Exact Online API connection?",
      type: Toggle,
      before: async (_, next) => {
        if (doConfirm) {
          return await next();
        } else {
          return await next(Prompts.MAKE_APP);
        }
      },
      after: async ({ resetConfirmed }, next) => {
        if (resetConfirmed) {
          return await next(Prompts.MAKE_APP);
        }
      },
    },
    {
      name: Prompts.MAKE_APP,
      message: "Have you successfully made an app?",
      type: Toggle,
      before: async (_, next) => {
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

        await next();
      },
      after: async ({ confirmedMakeApp }, next) => {
        await next(confirmedMakeApp ? undefined : Prompts.MAKE_APP);
      },
    },
    {
      name: Prompts.CLIENT_ID,
      message: "Please enter the Client ID:",
      type: Input,
      after: async (answer, next) => {
        if (!answer.clientId) {
          return await next(Prompts.CLIENT_ID);
        }
        clientId = answer.clientId!;
        await next();
      },
    },
    {
      name: Prompts.CLIENT_SECRET,
      message: "Please enter the Client Secret:",
      type: Input,
      after: async (answer, next) => {
        if (!answer.clientSecret) {
          return await next(Prompts.CLIENT_SECRET);
        }

        // Store the given data.
        const settings = SettingService.exactOptionsToSettings({
          baseUrl: BASE_URL,
          clientId: clientId,
          clientSecret: answer.clientSecret!,
        });
        SettingRepository.setAll(settings);
        // Recreate the Exact Api based on the stored settings.
        createExactApi();

        if (!exactApi) {
          console.error(
            colors.red("Error:"),
            "Something went wrong while setting up the Exact Online API.\n" +
              "Please try again (later).",
          );

          return await next(Prompts.MAKE_APP);
        }

        const url = exactApi.authRequestUrl();

        console.log(
          colors.bold("[2] Login to Exact.\n") +
            "Please go to the following URL and login:\n" +
            colors.gray("\t" + link(url, url)),
        );

        const code = await startWebServer();
        await exactApi.requestToken(code!);

        const division = await exactApi.retrieveDivision();

        if (!division) {
          console.error(
            colors.red("Error:"),
            "Something went wrong while setting up the Exact Online API.\n" +
              "Please try again (later).",
          );

          return await next(Prompts.MAKE_APP);
        } else {
          console.log(
            colors.green("Succes:"),
            "Created Exact Online API connection!",
          );
        }
      },
    },
  ]);
}

/**
 * Stars a webserver that only accepts a single request.
 * The user will be redirected to this page by Exact.
 * This server will then retrieve the token.
 */
async function startWebServer() {
  const server = serve({ hostname: "0.0.0.0", port: 8080 });

  for await (const request of server) {
    const code = new URL(request.url, BASE_URL).searchParams.get("code");
    await request.respond({
      status: 200,
      body: `
    <html>
    <body>
    You can close this page now ;)
    `,
    });
    server.close();
    return code;
  }
}
