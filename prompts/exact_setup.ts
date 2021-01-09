import { ansi, colors, Confirm, Input, link, prompt, Toggle } from "../deps.ts";

const enum Prompts {
  MAKE_APP = "confirmedMakeApp",
  CLIENT_ID = "clientId",
  CLIENT_SECRET = "clientSecret",
}

let clientId: string;
let clientSecret: string;

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
            "\t1. Register an app at " +
            link("apps.exactonline.com", "https://apps.exactonline.com/") +
            "\n" +
            "\t2. Enter the following into the 'Redirect URI' field: " +
            colors.italic("http://localhost:8080/") +
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
      },
    },
  ]);
}
