import { assertEquals, uuidv4 } from "../deps.ts";
import SettingRepository from "../repositories/SettingRepository.ts";
import { db } from "./_utils.ts";

const settingRepo = new SettingRepository(db);

Deno.test("Write using set(), read using getByKey()", () => {
  settingRepo.set({
    key: "key1",
    value: "val1",
  });

  const r = settingRepo.getByKey("key1");

  assertEquals(r.key, "key1");
  assertEquals(r.value, "val1");
});

Deno.test("Write multiple settings with conflicting keys using set()", () => {
  settingRepo.set({
    key: "key1",
    value: "val1",
  });

  settingRepo.set({
    key: "key1",
    value: "val2",
  });

  const r = settingRepo.getByKey("key1");

  assertEquals(r.key, "key1");
  assertEquals(r.value, "val2");
});

Deno.test("Write multiple settings using setAll()", () => {
  const settings = [{
    key: "key1",
    value: "val1",
  }, {
    key: "key2",
    value: "valX",
  }, {
    key: "key1",
    value: "val2",
  }];

  settingRepo.setAll(settings);
  const [s1, s2] = db.query("SELECT key, value FROM settings");

  assertEquals(s1, ["key1", "val2"]);
  assertEquals(s2, ["key2", "valX"]);
});

Deno.test("Write EXACT_STORAGE. settings and read them back", () => {
  const vals = [uuidv4.generate(), uuidv4.generate(), uuidv4.generate()];
  const settings = [{
    key: "EXACT_STORAGE." + vals[0],
    value: vals[0],
  }, {
    key: "EXACT_STORAGE." + vals[1],
    value: vals[1],
  }, {
    key: "EXACT_STORAGE." + vals[2],
    value: vals[2],
  }];

  settingRepo.setAll(settings);
  const [s1, s2, s3] = settingRepo.getExactStorageSettings();

  assertEquals(s1, settings[0]);
  assertEquals(s2, settings[1]);
  assertEquals(s3, settings[2]);
});
