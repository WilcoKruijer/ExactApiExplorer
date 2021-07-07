import { colors, Input, List, prompt } from "../deps.ts";
import ExactRepository from "../repositories/ExactRepository.ts";
import { ExactApiRequest, ExactApiRequestRest } from "../classes/ExactApi.ts";
import QueryHistoryService from "../services/QueryHistoryService.ts";
import QueryHistoryRepository from "../repositories/QueryHistoryRepository.ts";
import DatabaseSingleton from "../singletons/DatabaseSingleton.ts";
import SettingRepository from "../repositories/SettingRepository.ts";
import ExactApiSingleton from "../singletons/ExactApiSingleton.ts";

const enum Prompts {
  ENTER_URL = "urlEntry",
  ENTER_SELECT = "selectEntry",
  ENTER_FILTER = "filterEntry",
  ENTER_TOP = "topEntry",
}

const db = DatabaseSingleton.getInstance();
const settingRepo = new SettingRepository(db);
const queryHistoryRepo = new QueryHistoryRepository(db);

async function executeQuery(
  exactRepo: ExactRepository,
  request: ExactApiRequestRest,
) {
  console.log(
    "Will execute: " +
      colors.yellow("GET ") +
      colors.brightGreen(exactRepo.api.buildRestUrl(request).toString()),
  );

  try {
    const result = await exactRepo.cleanJsonRequest<
      Record<string, unknown>
    >(request);

    const { queryHistory, parameters } = QueryHistoryService.createHistory(
      request,
      result,
    );

    queryHistoryRepo.createQueryHistory(queryHistory);
    queryHistoryRepo.upsertMultipleEndpointParameter(parameters);

    if (!result || !result.length) {
      return console.log("No results found.");
    }

    let maxKeys = 0;
    for (const res of result) {
      for (const key of Object.keys(res)) {
        if (typeof res[key] === "object") {
          delete res[key];
        }
      }

      maxKeys = Math.max(Object.keys(res).length, maxKeys);
    }

    if (maxKeys < 10) {
      console.table(result);
    } else {
      console.log(result);
    }
  } catch (error) {
    console.log(
      colors.red("An error occured:") + " " + colors.italic(error.name),
    );

    if (!error.name.startsWith("Exact")) {
      throw error;
    }

    if (error.name === "ExactOnlineServiceError") {
      const errorMessage = error.exactResponse.error?.message?.value;
      if (errorMessage) {
        console.log("\t" + colors.italic(errorMessage));
      } else {
        console.dir(error.exactResponse);
      }
    }
  }
}

export default async function runQueryPrompts() {
  const api = ExactApiSingleton.getInstance(settingRepo);

  if (!api) {
    throw new TypeError(
      "Cannot run query prompts before Exact Api has been intialized.",
    );
  }

  const exactRepo = new ExactRepository(api);

  const request: Partial<ExactApiRequest> = {
    type: "REST",
    method: "GET",
  };

  const selectSuggestions: string[] = [];
  const filterSuggestions: string[] = [];
  const topSuggestions: string[] = [];

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

        const sets = queryHistoryRepo.getHistoryForEndpoint(urlEntry);
        const vars = queryHistoryRepo.getVariablesForEndpoint(urlEntry);
        const suggestions = QueryHistoryService.getSuggestions(sets, vars);
        selectSuggestions.push(...suggestions.selects);
        filterSuggestions.push(...suggestions.filters);
        topSuggestions.push(...suggestions.tops);

        request.resource = urlEntry;
        await next();
      },
    },
    {
      name: Prompts.ENTER_SELECT,
      message: "Select query:",
      type: List,
      list: true,
      suggestions: selectSuggestions,
      after: async ({ selectEntry }, next) => {
        if (selectEntry && selectEntry.length) {
          request.select = selectEntry.join(",");
        }

        await next();
      },
    },
    {
      name: Prompts.ENTER_FILTER,
      message: "Filter query:",
      type: Input,
      list: true,
      suggestions: filterSuggestions,
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
      list: true,
      suggestions: topSuggestions,
      after: async ({ topEntry }) => {
        if (topEntry) {
          request.top = topEntry;
        } else if (!request.select) {
          request.top = "1";
        }

        await executeQuery(exactRepo, request as ExactApiRequestRest);
      },
    },
  ]);
}
