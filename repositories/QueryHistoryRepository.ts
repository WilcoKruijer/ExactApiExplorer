import { db } from "../main.ts";

export interface EndpointParameter {
  endpoint: string;
  variable: string;
  type: string;
}

export interface QueryHistory {
  endpoint: string;
  selected?: string;
  filter?: string;
  top?: string;
}

export interface HistorySets {
  selects: Set<string>;
  filters: Set<string>;
  tops: Set<string>;
}

export default class QueryHistoryRepository {
  static createQueryHistory(qh: QueryHistory) {
    db.query(
      "INSERT INTO query_history (endpoint, selected, filter, top) " +
        "VALUES (:endpoint, :selected, :filter, :top)",
      qh,
    );
  }

  static upsertEndpointParameter(ep: EndpointParameter) {
    db.query(
      "INSERT OR IGNORE INTO endpoint_parameters (endpoint, variable, type) " +
        "VALUES (:endpoint, :variable, :type);",
      ep,
    );
  }

  static upsertMultipleEndpointParameter(eps: EndpointParameter[]) {
    db.startTransaction();
    for (const ep of eps) {
      this.upsertEndpointParameter(ep);
    }
    db.commit();
  }

  static getHistoryForEndpoint(endpoint: string): HistorySets {
    const selects: Set<string> = new Set();
    const filters: Set<string> = new Set();
    const tops: Set<string> = new Set();
    for (
      const [selected, filter, top] of db.query(
        "SELECT DISTINCT selected, filter, top FROM query_history WHERE endpoint=:endpoint",
        { endpoint },
      )
    ) {
      if (selected) {
        selects.add(selected);
      }

      if (filter) {
        filters.add(filter);
      }

      if (top) {
        tops.add(top);
      }
    }

    return {
      selects,
      filters,
      tops,
    }
  }

  static getVariablesForEndpoint(endpoint: string) {
    const variables: string[] = [];
    for (
      const [variable] of db.query(
        "SELECT variable FROM endpoint_parameters WHERE endpoint=:endpoint",
        { endpoint },
      )
    ) {
      variables.push(variable);
    }

    return variables;
  }
}
