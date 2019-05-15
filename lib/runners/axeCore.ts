import { AxePuppeteer } from "axe-puppeteer";
import puppeteer from "puppeteer";
import { Report, Runner, A11yOptions } from "../types";

export async function runAxeCore(url: string, options: A11yOptions) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setBypassCSP(true);

  await page.goto(url);

  const results = await new AxePuppeteer(page)
    .options({
      runOnly: {
        type: "tag",
        values: [options.standard.toLowerCase()] // Axe core can run multiple standards but this needs to be one to support one standard rule of pa11y
      }
    })
    .analyze();

  const title = await page.title();

  await page.close();
  await browser.close();

  return { results, documentTitle: title };
}

export const runWithAxeCore: Runner = async (url, options) => {
  const { results, documentTitle } = await runAxeCore(url, options);
  const report: Report = {
    documentTitle,
    pageUrl: results.url,
    errors: results.violations,
    warnings: results.incomplete,
    notices: results.inapplicable
  };
  return report;
};
