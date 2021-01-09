import db from "../database.ts";

export interface Setting {
  key: string;
  value: string;
}

class SettingRepository {
  getByKey(key: string): Setting {
    const [_, value] = db.query(
      "SELECT key, value FROM settings WHERE key=:key",
      { key },
    ).oneOrThrow();

    return {
      key,
      value,
    } as Setting;
  }

  create(key: string, value: string) {
    db.query(
      "INSERT INTO settings (key, value) VALUES (:key, :value)",
      { key, value },
    );
  }

}

export default new SettingRepository();
