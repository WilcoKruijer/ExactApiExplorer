import db from "../database.ts";
import SettingRepository from "../repositories/SettingRepository.ts";
import { startWebServer } from "../prompts/exact_setup.ts";
export default class Playground {
  constructor() {
    console.log("Constructed playground...");
  }

  async go() {
    try {
      SettingRepository.set({
        key: "Coole man",
        value: "Wilco",
      });
    } catch (_) {
      // pass
    }

    await startWebServer();
  }
}
