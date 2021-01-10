import type { ExactApiOptions } from "../classes/ExactApi.ts";
import type { Setting } from "../repositories/SettingRepository.ts";
import Utils from "../classes/Utils.ts";

const EXACT_STORAGE_PREFIX = "EXACT_STORAGE.";

class SettingService {
  exactOptionsToSettings(options: ExactApiOptions): Setting[] {
    return Object.keys(options)
      .map((key) => {
        return {
          key: EXACT_STORAGE_PREFIX + Utils.camelToSnakeCase(key).toUpperCase(),
          value: options[key as keyof ExactApiOptions],
        } as Setting;
      });
  }

  settingsToExactOptions(settings: Setting[]) {
    const obj: Record<string, string | number> = {};

    for (const setting of settings) {
      if (!setting.key.startsWith(EXACT_STORAGE_PREFIX)) {
        continue;
      }

      let variable: string | number;
      [, variable] = setting.key.split(".");
      variable = Utils.snakeToCamelCase(variable);

      // accessExpiry is a number, so we should convert.
      const value = variable === "accessExpiry"
        ? +setting.value
        : setting.value;

      obj[variable as keyof ExactApiOptions] = value;
    }

    if ("baseUrl" in obj && "clientId" in obj && "clientSecret" in obj) {
      // Only return an ExactApiOptions when we actually have a valid object.
      return obj as unknown as ExactApiOptions;
    }
  }
}

export default new SettingService();
