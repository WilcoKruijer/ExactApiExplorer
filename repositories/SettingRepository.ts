import db from "../database.ts";

export interface Setting {
  key: string;
  value: string;
}

export default class SettingRepository {
  static getByKey(key: string) {
    const [_, value] = db.query(
      "SELECT key, value FROM settings WHERE key=:key",
      { key },
    ).oneOrThrow();

    return {
      key,
      value,
    } as Setting;
  }

  static getExactStorageSettings() {
    const settings: Setting[] = [];
    for (
      const [key, value] of db.query(
        "SELECT key, value FROM SETTINGS WHERE key LIKE 'EXACT_STORAGE.%';",
      )
    ) {
      settings.push({
        key,
        value,
      });
    }

    return settings;
  }

  static set(setting: Setting) {
    db.query(
      "INSERT INTO settings (key, value) VALUES (:key, :value)" +
        "ON CONFLICT (key) DO UPDATE SET value = :value WHERE key = :key",
      setting,
    );
  }

  static setAll(settings: Setting[]) {
    db.startTransaction();
    for (const s of settings) {
      this.set(s);
    }
    db.commit();
  }
}
