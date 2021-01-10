import { db } from "../main.ts";
import SettingRepository from "../repositories/SettingRepository.ts";
export default class Playground {
  constructor() {
    console.log("Constructed playground...");
  }

  go() {
    try {
      SettingRepository.set({
        key: "Coole man",
        value: "Wilco",
      });
    } catch (_) {
      // pass
    }
  }
}
