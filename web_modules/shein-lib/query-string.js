export const ZERO = Symbol('zero');

const excludeArgumentValue = new Set([null, 0, '0', undefined, '', '全部']);
const excludeArgumentValue1 = new Set([null, 0, undefined, '', '全部']);
const SymbolToValueMap = {
  [ZERO]: 0,
};

function getRawValue(val) {
  if (Object.prototype.hasOwnProperty.call(SymbolToValueMap, val)) {
    return SymbolToValueMap[val];
  }
  return val;
}


export const toQueryString = (keys, paramObject) => keys
  .filter(key => !excludeArgumentValue.has(paramObject[key]))
  .map(key => `${key}=${getRawValue(paramObject[key])}`)
  .join('&');

export const toQueryString1 = (keys, paramObject) => keys
  .filter(key => !excludeArgumentValue1.has(paramObject[key]))
  .map(key => `${key}=${getRawValue(paramObject[key])}`)
  .join('&');

export function parseQueryString(queryString) {
  const querys = queryString.substring(queryString.re('?') + 1).split('&');
  return querys.reduce((reduced, current) => {
    const key = current.split('=')[0];
    const value = /^\d+$/.test(current.split('=')[1]) ?
      parseInt(current.split('=')[1], 10) :
      current.split('=')[1];
    return Object.assign({}, reduced, {
      [key]: value,
    });
  }, {});
}
