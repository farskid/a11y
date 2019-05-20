import * as path from "path";
import minimist from "minimist";
import { A11yOptions, SupportedStandard } from "./types";
import { logger, successLogger, errorLogger } from "./loggers";
import { runWithAxeCore } from "./runners/axeCore";
import { runWithPa11y } from "./runners/pa11y";
import { highlightText } from "./colors";
import ora from "ora";
import { createReport, storeReport } from "./report";
import merge from "lodash.merge";

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

    await storeProcesses;

    logger(report);

    if (options.failOnError) {
      errorLogger(
        `\nA11y found ${reports
          .map(r => r.errors.length)
          .reduce((t, c) => t + c, 0)} errors\n`
      );
      process.exit(1);
    }
  } catch (err) {
    errorLogger(err);
    throw err;
  } finally {
    successLogger(`Done!`);
    progressSpinner.stop();
  }
}

function main() {
  const args = minimist(process.argv.slice(2));
  const { url, standard, out, "fail-on-error": failOnError } = args;
  // Invalid url
  if (typeof url !== "string" || url === "") {
    errorLogger("a11y can't find a url");
    process.exit(1);
  }
  // Unsupported standard
  if (standard !== undefined && !supportedStandards.includes(standard)) {
    errorLogger(
      `Standard ${standard} is not supported. Only ${supportedStandards.join(
        "/"
      )} are supported for now.`
    );
    process.exit(1);
  }

  const defaultOptions: Partial<A11yOptions> = {
    out: path.resolve(process.cwd()),
    standard: "WCAG2A",
    failOnError: false
  };

  const options = merge(defaultOptions, { url, standard, out, failOnError });

  runA11y(url, options);
}

// Run main
main();
