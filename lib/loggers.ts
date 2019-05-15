import {
  text,
  errorText,
  warningText,
  noticeText,
  successText
} from "./colors";

type Logger = (...args: string[]) => void;

export const logger: Logger = (...args) => console.log(...args.map(text));
export const errorLogger: Logger = (...args) =>
  console.log(...args.map(errorText));
export const warningLogger: Logger = (...args) =>
  console.log(...args.map(warningText));
export const noticeLogger: Logger = (...args) =>
  console.log(...args.map(noticeText));
export const successLogger: Logger = (...args) =>
  console.log(...args.map(successText));
