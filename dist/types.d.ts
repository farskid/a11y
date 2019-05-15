import * as axe from "axe-core";
import { Browser, HttpMethod, Page, LaunchOptions, Headers } from "puppeteer";
export declare type Report = {
    errors: object[];
    notices: object[];
    warnings: object[];
    documentTitle: string;
    pageUrl: string;
};
export declare type Runner = (url: string) => Promise<Report>;
export interface A11yOptions {
    out: string;
}
export declare type AxeCoreResult = axe.AxeResults;
export declare type Pa11yOptions = {
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
export declare type Pa11yExtendedOptions = Pa11yOptions & {
    url: string;
};
export declare type IssueType = "error" | "warning" | "notice";
export declare type Issue = {
    code: string;
    context: string;
    message: string;
    selector: string;
    type: IssueType;
    typeCode: number;
};
export declare type Pa11yResult = {
    documentTitle: string;
    pageUrl: string;
    issues: Issue[];
};
