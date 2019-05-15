// TODO: add better typing
export function objectWithNoFalsyValue(obj: { [k: string]: any }) {
  return Object.keys(obj)
    .filter(k => !!obj[k])
    .reduce<any>((result, current) => {
      return { ...result, [current]: obj[current] };
    }, {});
}
