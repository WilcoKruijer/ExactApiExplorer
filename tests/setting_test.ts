import { ExactApiStorage } from "../classes/ExactApi.ts";
import SettingService from "../services/SettingService.ts";
import { assertEquals, assertThrows } from "../deps.ts";
import { Setting } from "../repositories/SettingRepository.ts";

Deno.test("Convert ExactApiStorage to array of settings", () => {
  const settings = SettingService.exactStorageToSettings({
    clientId: "some-kind-of-id",
    clientSecret: "thisIsASecret123",
    division: 1234567,
  } as ExactApiStorage);

  assertEquals(settings, [
    { key: "EXACT_STORAGE.CLIENT_ID", value: "some-kind-of-id" },
    { key: "EXACT_STORAGE.CLIENT_SECRET", value: "thisIsASecret123" },
    { key: "EXACT_STORAGE.DIVISION", value: 1234567 },
  ]);
});

Deno.test("Convert settings to to array of ExactApiStorage", () => {
  const settings = [
    { key: "EXACT_STORAGE.CLIENT_ID", value: "some-kind-of-id" },
    { key: "EXACT_STORAGE.CLIENT_SECRET", value: "thisIsASecret123" },
    { key: "Irrelevant", value: "123" },
    { key: "EXACT_STORAGE.ACCESS_EXPIRY", value: "123123123" },
  ] as Setting[];

  const options = SettingService.settingsToExactStorage(settings);

  assertEquals(options, {
    clientId: "some-kind-of-id",
    clientSecret: "thisIsASecret123",
    accessExpiry: 123123123,
  });
});
