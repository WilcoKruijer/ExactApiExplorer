import { assertEquals, assertThrows } from "../deps.ts";
import ExactRepository from "../repositories/ExactRepository.ts";

Deno.test("Succesfully convert ODataDateTime", () => {
  assertEquals(
    ExactRepository.convertDate("/Date(1536364800000)/"),
    new Date(1536364800000),
  );
});

Deno.test("ODataDateTime: does not convert invalid string", () => {
  assertThrows(() => {
    ExactRepository.convertDate("/Date(abc)/");
  }, TypeError);

  assertThrows(() => {
    ExactRepository.convertDate("abc");
  }, TypeError);

  assertThrows(() => {
    ExactRepository.convertDate("Date(1536364800000)");
  }, TypeError);
});
