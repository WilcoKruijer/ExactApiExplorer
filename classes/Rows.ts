import { Rows } from "../deps.ts";

declare module "../deps.ts" {
  export interface Rows {
    oneOrThrow(): unknown[];
    oneOrUndefined(): unknown[];
  }
}

export class OneRowError extends Error {
  constructor(message: string) {
    super(message);
  }
}

/**
 * Takes the first result, throws when there are multiple results or no results at all.
 */
Rows.prototype.oneOrThrow = function () {
  const { value } = this.next();
  const { done } = this.next();

  if (!done) {
    throw new OneRowError("Multiple rows in result.");
  }

  if (typeof value === "undefined") {
    throw new OneRowError("No rows in result.");
  }

  return value;
};

/**
 * Takes the first result, throws when there are multiple results.
 */
Rows.prototype.oneOrUndefined = function () {
  const { value } = this.next();
  const { done } = this.next();

  if (!done) {
    throw new OneRowError("Multiple rows in result.");
  }

  return value;
};
