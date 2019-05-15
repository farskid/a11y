import * as path from "path";
import * as fs from "fs";
import minimist from "minimist";
import { A11yOptions } from "./types";
import { logger, successLogger, errorLogger } from "./loggers";
import { runWithAxeCore } from "./runners/axeCore";
import { runWithPa11y } from "./runners/pa11y";
import { highlightText } from "./colors";
import ora from "ora";
import { jsonStringifyWithUndefined } from "./stringify";
import { printReport } from "./report";

const spinner = (txt: string) => ora(txt);

export type Engine = "axecore" | "pa11y";
const engines: Engine[] = ["axecore", "pa11y"];

async function runA11y(url: string, options: A11yOptions) {
  const { out } = options;
  const progressSpinner = spinner(
    `Gathering a11y insights for ${highlightText(url)}`
  );

  logger(`\n`);
  progressSpinner.start();

  const runners = Promise.all([runWithAxeCore(url), runWithPa11y(url)]);

  try {
    const reports = await runners;
    let report = `
      ${`Accessibility Results For:`.toUpperCase()}
      -----------
      ${reports[0].documentTitle}
      ${reports[0].pageUrl}
    `;
    reports.forEach((rep, index) => {
      report += `
      ${printReport(rep, out, engines[index])}
      `;
      fs.writeFileSync(
        path.resolve(out, `a11y-report-${engines[index]}.json`),
        jsonStringifyWithUndefined(rep, 2)
      );
    });
    logger(report);
    process.exitCode = 0;
  } catch (err) {
    errorLogger(err);
    process.exitCode = 1;
  } finally {
    successLogger(`Done!`);
    progressSpinner.stop();
  }
}

function main() {
  const args = minimist(process.argv.slice(2));
  const { url, ...options } = args;
  if (typeof url !== "string" || url === "") {
    return errorLogger("a11y can't find a url");
  }
  const defaultOptions: A11yOptions = {
    out: path.resolve(process.cwd())
  };
  runA11y(url, Object.assign({}, defaultOptions, options));
}

// Run main
main();
