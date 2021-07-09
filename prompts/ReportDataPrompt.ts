import { Number, prompt } from "../deps.ts";
import ExactReportService from "../services/ExactReportService.ts";
import BasePrompt from "./BasePrompt.ts";
import { writeJsonFile } from "../repositories/FileRepository.ts";

const enum Prompts {
  YEAR = "year",
}

export default class ReportDataPrompt extends BasePrompt {
  constructor() {
    super();
    this.ensureApi();
  }

  run() {
    return prompt([
      {
        name: Prompts.YEAR,
        message: "Please enter the year to get data from:",
        type: Number,
        min: 1970,
        max: 3000,
        float: false,
        after: async ({ year }, next) => {
          if (!year) {
            return next(Prompts.YEAR);
          }

          const reportService = new ExactReportService(this.exactRepo);
          const report = await reportService.getReportForYear(year);
          await writeJsonFile(`report_${year}`, report);
        },
      },
    ]);
  }
}
