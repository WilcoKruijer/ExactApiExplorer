import ExactApi from "../classes/ExactApi.ts";
import { ansi, colors, Confirm, Input, link, prompt, Toggle } from "../deps.ts";

const BASE_URL = "http://localhost:8080";

const enum Prompts {
  MAKE_APP = "confirmedMakeApp",
  CLIENT_ID = "clientId",
  CLIENT_SECRET = "clientSecret",
  ENTER_CODE = "url",
}

let clientId: string;
let clientSecret: string;
let exactApi: ExactApi;

export async function runExactSetup() {
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
      name: Prompts.ENTER_CODE,
      message: "Please enter the code from the URL:",
      type: Input,
      before: (_, next) => {
        exactApi = new ExactApi({
          baseUrl: BASE_URL,
          clientId: clientId,
          clientSecret: clientSecret,
        });

        const url = exactApi.authRequestUrl();

        console.log(
          colors.bold("[2] Login to Exact.\n") +
            "\t- Please go to the following URL and login:\n" +
            colors.gray("\t\t" + link(url, url)) +
            "\n" +
            "\t- After logging in you will be redirected to a page. Copy the entire URL from your browser's search bar.",
        );

        next();
      },
      after: ({ url }, next) => {
        if (!url) {
          next(Prompts.ENTER_CODE);
        }
        const code = new URL(url!).searchParams.get("code");

        if (!code) {
          next(Prompts.ENTER_CODE);
        }

        next();
        console.log("your code:", code);
      },
    },
  ]);
}
