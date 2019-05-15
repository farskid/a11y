import * as path from "path";
import { Report } from "./types";
import { highlightText, errorText, noticeText } from "./colors";
import { Engine } from "./a11y";
import { warningText } from "./colors";

export function printReport(results: Report, out: string, engine: Engine) {
  const ouputPath = path.resolve(out, `a11y-report-${engine}.json`);
  return `
    -----------
    ${errorText(`A11y:: Errors found: ${results.errors.length}`)}
    ${warningText(`A11y:: Warnings Found: ${results.warnings.length}`)}
    ${noticeText(`A11y:: Notices Found: ${results.notices.length}`)}
    -----------
    Reports saved in ${highlightText(`<${ouputPath}>`)}
  `;
}
