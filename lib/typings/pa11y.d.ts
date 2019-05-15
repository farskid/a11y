import { Browser, HttpMethod, Page, LaunchOptions, Headers } from "puppeteer";

export as namespace pa11y;

export type Pa11yOptions = {
  actions: string[];
  browser: Browser | Page;
  chromeLaunchConfig: LaunchOptions;
  headers: Headers;
  hideElements: string | null;
  ignore: string[];
  includeNotices: boolean;
  includeWarnings: boolean;
  log: {
    debug: (...args: any[]) => void;
    error: (...args: any[]) => void;
    info: (...args: any[]) => void;
  };
  method: HttpMethod;
  postData: string | null;
  rootElement: string | null;
  rules: string[];
  screenCapture: string | null;
  standard: "Section508" | "WCAG2A" | "WCAG2AA" | "WCAG2AAA";
  timeout: number;
  userAgent: string;
  viewport: {
    width: number;
    height: number;
  };
  wait: number;
  reporter: string | undefined;
};

export type Pa11yExtendedOptions = Pa11yOptions & { url: string };

export type IssueType = "error" | "warning" | "notice";
export type Issue = {
  code: string; // TODO: strictly type this with HTML CodeSniffer
  context: string;
  message: string;
  selector: string;
  type: IssueType;
  typeCode: number;
};

export type Pa11yResult = {
  documentTitle: string;
  pageUrl: string;
  issues: Issue[];
};

type Pa11y = (
  url: string,
  options: Partial<Pa11yOptions>
) => Promise<Pa11yResult>;

declare const pa11y: Pa11y;
export default pa11y;
