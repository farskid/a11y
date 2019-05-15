import colors from "colors";
export type Color = (str: string) => string;

export const text: Color = (str: string) => colors.white(str);
export const errorText: Color = (str: string) => colors.bold(str).red;
export const warningText: Color = (str: string) => colors.bold(str).yellow;
export const noticeText: Color = (str: string) => colors.bold(str).cyan;
export const successText: Color = (str: string) => colors.bold(str).green;
export const highlightText: Color = (str: string) => colors.magenta(str);
