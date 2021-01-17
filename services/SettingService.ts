import type { ExactApiStorage } from "../classes/ExactApi.ts";
import type { Setting } from "../repositories/SettingRepository.ts";
import Utils from "../classes/Utils.ts";

const EXACT_STORAGE_PREFIX = "EXACT_STORAGE.";

export default class SettingService {
  static exactStorageToSettings(options: ExactApiStorage): Setting[] {
    return Object.keys(options)
      .map((key) => {
        return {
          key: EXACT_STORAGE_PREFIX + Utils.camelToSnakeCase(key).toUpperCase(),
          value: options[key as keyof ExactApiStorage],
        } as Setting;
      });
  }

  static settingsToExactStorage(settings: Setting[]) {
    const obj: Record<string, string | number> = {};

    for (const setting of settings) {
      if (!setting.key.startsWith(EXACT_STORAGE_PREFIX)) {
        continue;
      }

      let variable: string | number;
      [, variable] = setting.key.split(".");
      variable = Utils.snakeToCamelCase(variable);

      // These variables should be numbers, so we should convert.
      const value = variable === "accessExpiry" || variable === "division"
        ? +setting.value
        : setting.value;

      obj[variable as keyof ExactApiStorage] = value;
    }

    if ("clientId" in obj && "clientSecret" in obj) {
      // Only return an ExactApiStorage when we actually have a valid object.
      return obj as unknown as ExactApiStorage;
    }
  }
}
