import * as path from "path";
import { writeFile, ensureFile } from "fs-extra";
import { Report } from "./types";
import { highlightText, errorText, noticeText } from "./colors";
import { Engine } from "./a11y";
import { warningText } from "./colors";
import { jsonStringifyWithUndefined } from "./stringify";

export function createReport(results: Report, out: string, engine: Engine) {
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

export async function storeReport(results: Report, storePath: string) {
  try {
    await ensureFile(storePath);
    await writeFile(
      path.resolve(storePath),
      jsonStringifyWithUndefined(results, 2)
    );
    return true;
  } catch (err) {
    throw err;
  }
}
