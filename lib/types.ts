import * as axe from "axe-core";

export type Report = {
  errors: object[];
  notices: object[];
  warnings: object[];
  documentTitle: string;
  pageUrl: string;
};

export type Runner = (url: string) => Promise<Report>;
export interface A11yOptions {
  out: string;
}

export type AxeCoreResult = axe.AxeResults;
