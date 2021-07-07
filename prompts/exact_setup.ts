import { colors, Input, link, prompt, serve, Toggle } from "../deps.ts";
import ExactRepository from "../repositories/ExactRepository.ts";
import SettingRepository from "../repositories/SettingRepository.ts";
import { EXACT_REDIRECT_URL } from "../resources/constants.ts";
import SettingService from "../services/SettingService.ts";
import DatabaseSingleton from "../singletons/DatabaseSingleton.ts";
import ExactApiSingleton from "../singletons/ExactApiSingleton.ts";

const enum Prompts {
  RESET_CONFIRMATION = "resetConfirmed",
  MAKE_APP = "confirmedMakeApp",
  CLIENT_ID = "clientId",
  CLIENT_SECRET = "clientSecret",
}

export async function runExactSetup(doConfirm = false) {
  const db = DatabaseSingleton.getInstance();
  const settingRepo = new SettingRepository(db);
  let api = ExactApiSingleton.getInstance(settingRepo);
  let exactRepo: ExactRepository | undefined;

  if (api) {
    exactRepo = new ExactRepository(api);
  }

  let clientId: string;

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
            colors.italic(EXACT_REDIRECT_URL) +
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
        const settings = SettingService.exactStorageToSettings({
          clientId: clientId,
          clientSecret: answer.clientSecret!,
        });
        settingRepo.setAll(settings);
        // Recreate the Exact Api based on the stored settings.
        api = ExactApiSingleton.getInstance(settingRepo);

        if (!api) {
          console.error(
            colors.red("Error:"),
            "Something went wrong while setting up the Exact Online API.\n" +
              "Please try again (later).",
          );

          return await next(Prompts.MAKE_APP);
        }

        exactRepo = new ExactRepository(api);
        const url = exactRepo.api.authRequestUrl;

        console.log(
          colors.bold("[2] Login to Exact.\n") +
            "Please go to the following URL and login:\n" +
            colors.gray("\t" + link(url, url)),
        );

        const code = await startWebServer();
        await api.requestToken(code!);

        const division = await api.retrieveDivision();

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
 * Starts a webserver that only accepts a single request.
 * The user will be redirected to this page by Exact.
 * This server will then retrieve the token.
 */
async function startWebServer() {
  // TODO(Wilco): check for AddrInUse and change port when relevant.
  const server = serve({ hostname: "0.0.0.0", port: 8080 });

  for await (const request of server) {
    const code = new URL(request.url, EXACT_REDIRECT_URL).searchParams.get(
      "code",
    );
    await request.respond({
      status: 200,
      body: "<html><body>You can close this page now ;)",
    });
    server.close();
    return code;
  }
}
