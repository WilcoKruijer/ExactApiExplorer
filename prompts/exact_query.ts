import { colors, Input, prompt, Select } from "../deps.ts";
import { runExactSetup } from "./exact_setup.ts";
import Playground from "../classes/Playground.ts";
import { exactApi } from "../main.ts";
import ExactRepository from "../repositories/ExactRepository.ts";
import ExactApi, { ExactApiRequest } from "../classes/ExactApi.ts";

const enum Prompts {
  ENTER_URL = "urlEntry",
  ENTER_SELECT = "selectEntry",
  ENTER_FILTER = "filterEntry",
  ENTER_TOP = "topEntry",
}

async function executeQuery(request: ExactApiRequest) {
  console.log(
    "Will execute: " +
      colors.yellow("GET ") +
      colors.brightGreen(ExactApi.buildUrl(request).toString()),
  );

  try {
    const result = await ExactRepository.cleanJsonRequest<unknown>(request);
    console.log(result);
  } catch (error) {
    console.log(
      colors.red("An error occured:") + " " + colors.italic(error.name),
    );

    if (error.name === "ExactOnlineServiceError") {
      const errorMessage = error.exactResponse.error?.message?.value;
      if (errorMessage) {
        console.log("\t" + colors.italic(errorMessage));
      }
    }
  }
}

export default async function runQueryPrompts() {
  const request: Partial<ExactApiRequest> = {
    method: "GET",
  };

  await prompt([
    {
      name: Prompts.ENTER_URL,
      message: "Please enter an URL:",
      type: Input,
      list: true,
      info: true,
      suggestions: ExactRepository.endpoints,
      after: async ({ urlEntry }, next) => {
        if (!urlEntry) {
          return await next(Prompts.ENTER_URL);
        }

        request.resource = urlEntry;
        await next();
      },
    },
    {
      name: Prompts.ENTER_SELECT,
      message: "Select query:",
      type: Input,
      after: async ({ selectEntry }, next) => {
        if (selectEntry) {
          request.select = selectEntry;
        }

        await next();
      },
    },
    {
      name: Prompts.ENTER_FILTER,
      message: "Filter query:",
      type: Input,
      after: async ({ filterEntry }, next) => {
        if (filterEntry) {
          request.filter = filterEntry;
        }

        await next();
      },
    },
    {
      name: Prompts.ENTER_TOP,
      message: "Top query:",
      type: Input,
      after: async ({ topEntry }, next) => {
        if (topEntry) {
          request.top = topEntry;
        } else {
          request.top = "1";
        }

        await executeQuery(request as ExactApiRequest);
      },
    },
  ]);
}
