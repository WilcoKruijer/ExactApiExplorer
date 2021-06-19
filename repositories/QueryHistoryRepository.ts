import Database from "../classes/Database.ts";
import type { QueryParam } from "../deps.ts";

export interface EndpointParameter extends Record<string, QueryParam> {
  endpoint: string;
  variable: string;
  type: string;
}

export interface QueryHistory extends Record<string, QueryParam> {
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
  #db: Database;

  constructor(db: Database) {
    this.#db = db;
  }

  public createQueryHistory(qh: QueryHistory) {
    this.#db.query(
      "INSERT INTO query_history (endpoint, selected, filter, top) " +
        "VALUES (:endpoint, :selected, :filter, :top)",
      qh,
    );
  }

  public upsertEndpointParameter(ep: EndpointParameter) {
    this.#db.query(
      "INSERT OR IGNORE INTO endpoint_parameters (endpoint, variable, type) " +
        "VALUES (:endpoint, :variable, :type);",
      ep,
    );
  }

  public upsertMultipleEndpointParameter(eps: EndpointParameter[]) {
    this.#db.startTransaction();
    for (const ep of eps) {
      this.upsertEndpointParameter(ep);
    }
    this.#db.commit();
  }

  public getHistoryForEndpoint(endpoint: string): HistorySets {
    const selects: Set<string> = new Set();
    const filters: Set<string> = new Set();
    const tops: Set<string> = new Set();
    for (
      const [selected, filter, top] of this.#db.query(
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
    };
  }

  public getVariablesForEndpoint(endpoint: string) {
    const variables: string[] = [];
    for (
      const [variable] of this.#db.query(
        "SELECT variable FROM endpoint_parameters WHERE endpoint=:endpoint",
        { endpoint },
      )
    ) {
      variables.push(variable);
    }

    return variables;
  }
}
