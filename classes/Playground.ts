import db from "../database.ts";
import settingRepository from "../repositories/Setting.ts";

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

    db.query(
      "INSERT INTO settings (key, value) VALUES (?)",
      [["a", "1"], ["b", "2"]],
    );

    console.log(db.query("SELECT * FROM settings"));
  }
}
