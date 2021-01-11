import SettingService from "../services/SettingService.ts";
import ExactApi from "../classes/ExactApi.ts";
import SettingRepository from "../repositories/SettingRepository.ts";

// Initialize the ExactApi singleton
export let exactApi: ExactApi | undefined = undefined;

export function createExactApi(): boolean {
  const apiOptions = SettingService.settingsToExactOptions(
    SettingRepository.getExactStorageSettings(),
  );

  if (!apiOptions) {
    return false;
  }

  exactApi = new ExactApi(apiOptions);
  exactApi.setOptionsCallback = (options) => {
    const settings = SettingService.exactOptionsToSettings(
      options,
    );
    SettingRepository.setAll(settings);
    // console.log(">>> Saving Exact Storage to DISK.");
  };
  // console.log("Created Exact API.");

  return true;
}
