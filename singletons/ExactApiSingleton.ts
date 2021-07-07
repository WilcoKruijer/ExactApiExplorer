import ExactApi from "../classes/ExactApi.ts";
import SettingRepository from "../repositories/SettingRepository.ts";
import { EXACT_REDIRECT_URL } from "../resources/constants.ts";
import SettingService from "../services/SettingService.ts";

export default class ExactApiSingleton {
  private static api: ExactApi | undefined = undefined;

  static getInstance(
    settingRepo: SettingRepository,
  ): ExactApi | undefined {
    if (ExactApiSingleton.api) {
      return ExactApiSingleton.api;
    }

    const apiStorage = SettingService.settingsToExactStorage(
      settingRepo.getExactStorageSettings(),
    );

    if (!apiStorage) {
      return;
    }

    ExactApiSingleton.api = new ExactApi({
      exactTLD: "nl",
      redirectUrl: EXACT_REDIRECT_URL,
    }, apiStorage);

    ExactApiSingleton.api.setStorageCallback = (storage) => {
      const settings = SettingService.exactStorageToSettings(
        storage,
      );
      settingRepo.setAll(settings);
    };

    return ExactApiSingleton.api;
  }
}
