import * as path from "path";
import minimist from "minimist";
import { A11yOptions, SupportedStandard } from "./types";
import { logger, successLogger, errorLogger } from "./loggers";
import { runWithAxeCore } from "./runners/axeCore";
import { runWithPa11y } from "./runners/pa11y";
import { highlightText } from "./colors";
import ora from "ora";
import { createReport, storeReport } from "./report";

const spinner = (txt: string) => ora(txt);

export type Engine = "axecore" | "pa11y";
const engines: Engine[] = ["axecore", "pa11y"];

const supportedStandards: SupportedStandard[] = [
  "WCAG2A",
  "WCAG2AA",
  "Section508"
];

async function runA11y(url: string, options: A11yOptions) {
  const { out } = options;
  logger("\n");
  const progressSpinner = spinner(
    `Gathering a11y insights for ${highlightText(url)} \n\n`
  );

  progressSpinner.start();

  const runners = Promise.all([
    runWithAxeCore(url, options),
    runWithPa11y(url, options)
  ]);

  try {
    const reports = await runners;
    const report = `\n    ${`Accessibility Results For:`.toUpperCase()}
    -----------
    ${reports[0].documentTitle}
    ${reports[0].pageUrl}
    `
      .concat(
        ...reports.map((rep, index) => createReport(rep, out, engines[index]))
      )
      .concat(`\n\n`);

    const storeProcesses = Promise.all(
      reports.map((rep, index) =>
        storeReport(
          rep,
          path.resolve(out, `a11y-report-${engines[index]}.json`)
        )
      )
    );

    try {
      await storeProcesses;
    } catch (err) {
      throw err;
    }

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
  const { url, standard, out } = args;
  // Invalid url
  if (typeof url !== "string" || url === "") {
    return errorLogger("a11y can't find a url");
  }
  // Unsupported standard
  if (standard !== undefined && !supportedStandards.includes(standard)) {
    return errorLogger(
      `Standard ${standard} is not supported. Only ${supportedStandards.join(
        "/"
      )} are supported for now.`
    );
  }

  const defaultOptions: Partial<A11yOptions> = {
    out: path.resolve(process.cwd()),
    standard: "WCAG2A"
  };
  const options = { ...defaultOptions, url, out, standard };

  runA11y(url, options);
}

// Run main
main();
