import { Pa11yOptions, Pa11yResult } from "../types";

declare function pa11y(
  url: string,
  options: Partial<Pa11yOptions>
): Promise<Pa11yResult>;

export = pa11y;
export as namespace pa11y;
