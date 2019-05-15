import pa11y from "pa11y";
import { Report, Runner, Pa11yOptions } from "../types";

export const runWithPa11y: Runner = async (url: string) => {
  const pa11yOptions: Partial<Pa11yOptions> = {
    rootElement: "#__next",
    standard: "WCAG2A",
    includeNotices: true,
    includeWarnings: true
  };
  const results = await pa11y(url, pa11yOptions);
  const report: Report = {
    documentTitle: results.documentTitle,
    pageUrl: results.pageUrl,
    errors: results.issues.filter(r => r.type === "error"),
    warnings: results.issues.filter(r => r.type === "warning"),
    notices: results.issues.filter(r => r.type === "notice")
  };
  return report;
};
