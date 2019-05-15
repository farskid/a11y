export const jsonStringifyWithUndefined = (obj: any, space: string | number) =>
  JSON.stringify(
    obj,
    (_: string, v: any) => (v === undefined ? "undefined" : v),
    space
  );
