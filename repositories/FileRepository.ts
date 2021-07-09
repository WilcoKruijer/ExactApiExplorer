import { colors, dirname, ensureDir, extname, join, sep } from "../deps.ts";

export async function writeJsonFile(
  fileName: string,
  data: unknown,
  format = true,
) {
  if (!fileName) {
    throw new TypeError("Empty fileName given.");
  }

  if (fileName.split(sep)[0] !== "out") {
    fileName = join("out", fileName);
  }

  await ensureDir(dirname(fileName));

  if (extname(fileName) !== ".json") {
    fileName += ".json";
  }

  // Remove all spaces
  fileName = fileName.replace(/\s/g, "_");

  const encoder = new TextEncoder();
  const encodedData = encoder.encode(
    JSON.stringify(data, null, format ? 2 : undefined),
  );

  await Deno.writeFile(fileName, encodedData);

  console.log(
    `Written transactions to: ${colors.cyan(fileName)}`,
  );
}
