import { ExactApiOptions } from "../classes/ExactApi.ts";
import SettingService from "../services/SettingService.ts";
import { assertEquals, assertThrows } from "../deps.ts";
import { Setting } from "../repositories/SettingRepository.ts";

Deno.test("Convert ExactApiOptions to array of settings", () => {
  const settings = SettingService.exactOptionsToSettings({
    baseUrl: "http://localhost:8080",
    clientId: "some-kind-of-id",
    clientSecret: "thisIsASecret123",
  } as ExactApiOptions);

  assertEquals(settings, [
    { key: "EXACT_STORAGE.BASE_URL", value: "http://localhost:8080" },
    { key: "EXACT_STORAGE.CLIENT_ID", value: "some-kind-of-id" },
    { key: "EXACT_STORAGE.CLIENT_SECRET", value: "thisIsASecret123" },
  ]);
});

Deno.test("Convert settings to to array of ExactApiOptions", () => {
  const settings = [
    { key: "EXACT_STORAGE.BASE_URL", value: "http://localhost:8080" },
    { key: "EXACT_STORAGE.CLIENT_ID", value: "some-kind-of-id" },
    { key: "EXACT_STORAGE.CLIENT_SECRET", value: "thisIsASecret123" },
    { key: "EXACT_STORAGE.ACCESS_EXPIRY", value: "123123123" },
  ] as Setting[];

  const options = SettingService.settingsToExactOptions(settings);

  assertEquals(options, {
    baseUrl: "http://localhost:8080",
    clientId: "some-kind-of-id",
    clientSecret: "thisIsASecret123",
    accessExpiry: 123123123,
  });
});
