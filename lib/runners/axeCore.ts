import { AxePuppeteer } from "axe-puppeteer";
import puppeteer from "puppeteer";
import { Report } from "../types";

export async function runAxeCore(url: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setBypassCSP(true);

  await page.goto(url);

  const results = await new AxePuppeteer(page).analyze();

  const title = await page.title();

  await page.close();
  await browser.close();

  return { results, documentTitle: title };
}

export async function runWithAxeCore(url: string) {
  const { results, documentTitle } = await runAxeCore(url);
  const report: Report = {
    documentTitle,
    pageUrl: results.url,
    errors: results.violations,
    warnings: results.incomplete,
    notices: results.inapplicable
  };
  return report;
}
