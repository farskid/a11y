export default function minimist(arg?: string[], options?: Options): ParsedArgs;
export interface Options {
  string?: string | string[];

  boolean?: boolean | string | string[];

  alias?: { [key: string]: string | string[] };

  default?: { [key: string]: any };

  stopEarly?: boolean;

  unknown?: (arg: string) => boolean;

  "--"?: boolean;
}

export interface ParsedArgs {
  [arg: string]: any;

  "--"?: string[];

  _: string[];
}
