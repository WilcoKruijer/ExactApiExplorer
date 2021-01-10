import { ExactApiRequest } from "../classes/ExactApi.ts";
import {
  EndpointParameter,
  QueryHistory,
  HistorySets,
} from "../repositories/QueryHistoryRepository.ts";

export interface HistoryResult {
  queryHistory: QueryHistory;
  parameters: EndpointParameter[];
}

export default class QueryHistoryService {
  static createHistory(
    request: ExactApiRequest,
    result: Record<string, unknown>[] | undefined,
  ): HistoryResult {
    const queryHistory: QueryHistory = {
      endpoint: request.resource,
      selected: request.select ?? undefined,
      filter: request.filter ?? undefined,
      top: request.top ?? undefined,
    };

    if (!result) {
      return {
        queryHistory,
        parameters: [],
      };
    }

    const keyMap: Record<string, EndpointParameter> = {};
    for (const res of result) {
      for (const key of Object.keys(res)) {
        if (!(key in keyMap)) {
          keyMap[key] = {
            endpoint: request.resource,
            variable: key,
            type: typeof res[key],
          };
        }
      }
    }

    return {
      queryHistory,
      parameters: Object.values(keyMap),
    };
  }

  static getSuggestions(sets: HistorySets, variables: string[]) {
    for (const v of variables) {
      sets.selects.add(v);
    }

    return {
      selects: Array.from(sets.selects),
      filters: Array.from(sets.filters),
      tops: Array.from(sets.tops)
    }
  }
}
