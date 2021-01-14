export default class Utils {
  // From https://stackoverflow.com/questions/54246477/how-to-convert-camelcase-to-snake-case-in-javascript
  /** Converts a camelcase variable name to snakecase. */
  static camelToSnakeCase(str: string) {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }

  // From https://hisk.io/javascript-snake-to-camel/
  /** Converts a snakecase variable name to camelcase.*/
  static snakeToCamelCase(str: string) {
    return str.toLowerCase().replace(
      /([-_][a-z])/g,
      (group) =>
        group.toUpperCase()
          .replace("-", "")
          .replace("_", ""),
    );
  }
}
