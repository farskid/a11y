import { Report } from "./types";
import { Engine } from "./a11y";
export declare function createReport(results: Report, out: string, engine: Engine): string;
export declare function storeReport(results: Report, storePath: string): Promise<boolean>;
