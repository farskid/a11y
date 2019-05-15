import * as axe from "axe-core";
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
