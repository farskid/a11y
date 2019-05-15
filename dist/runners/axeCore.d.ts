import { Report } from "../types";
export declare function runAxeCore(url: string): Promise<{
    results: import("axe-core").AxeResults;
    documentTitle: string;
}>;
export declare function runWithAxeCore(url: string): Promise<Report>;
