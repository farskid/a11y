import * as axe from "axe-core";
import { Browser, HttpMethod, Page, LaunchOptions, Headers } from "puppeteer";

export type Report = {
  errors: object[];
  notices: object[];
  warnings: object[];
  documentTitle: string;
  pageUrl: string;
};

export type SupportedStandard = "WCAG2A" | "WCAG2AA" | "Section508";
export type SupportedOptions = {
  standard: SupportedStandard;
};

export type Runner = (url: string, options: A11yOptions) => Promise<Report>;
export type A11yArguments = {
  out: string;
  url: string;
};
export interface A11yOptions extends SupportedOptions, A11yArguments {}

export type AxeCoreResult = axe.AxeResults;

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
  standard: SupportedStandard;
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
