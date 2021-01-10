import { assertEquals, assertThrows } from "../deps.ts";
import Utils from "../classes/Utils.ts";

// deno test --unstable --allow-read=. --allow-write=.

Deno.test("Camelcase to snakecase", () => {
  assertEquals(Utils.camelToSnakeCase("thisIsCool"), "this_is_cool");
  assertEquals(Utils.camelToSnakeCase("testing"), "testing");
});

Deno.test("Snakecase to camelcase", () => {
  assertEquals(Utils.snakeToCamelCase("this_is_cool"), "thisIsCool");
  assertEquals(Utils.snakeToCamelCase("testing"), "testing");
  assertEquals(Utils.snakeToCamelCase("ALL_CAPS_THING"), "allCapsThing");
  assertEquals(Utils.snakeToCamelCase("TESTING"), "testing");
});
