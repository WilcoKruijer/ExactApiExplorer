import Database from "../classes/Database.ts";
import type { QueryParam } from "../deps.ts";

export interface Setting extends Record<string, QueryParam> {
  key: string;
  value: string;
}

export default class SettingRepository {
  #db: Database;

  constructor(db: Database) {
    this.#db = db;
  }

  public getByKey(key: string) {
    const [_, value] = this.#db.query(
      "SELECT key, value FROM settings WHERE key=:key",
      { key },
    ).oneOrThrow();

    return {
      key,
      value,
    } as Setting;
  }

  public getExactStorageSettings() {
    const settings: Setting[] = [];
    for (
      const [key, value] of this.#db.query(
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

  public set(setting: Setting) {
    this.#db.query(
      "INSERT INTO settings (key, value) VALUES (:key, :value)" +
        "ON CONFLICT (key) DO UPDATE SET value = :value WHERE key = :key",
      setting,
    );
  }

  public setAll(settings: Setting[]) {
    this.#db.startTransaction();
    for (const s of settings) {
      this.set(s);
    }
    this.#db.commit();
  }
}
