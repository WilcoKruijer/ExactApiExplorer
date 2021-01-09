import settingRepository from "../repositories/setting.ts";

export default class Playground {
  constructor() {
    console.log("Constructed playground...");
  }

  go() {
    try {
      settingRepository.create("Author", "Wilco");
    } catch (_) {
      // pass
    }
    const res = settingRepository.getByKey("Author");
    console.log(res);
  }
}
