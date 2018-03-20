export function makeActionCreator(type, ...argNames) {
  return function createdAction(...args) {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

export function flattenArray(arr) {
  return arr.reduce((red, x) => {
    if (Array.isArray(x)) {
      return [...red, ...flattenArray(x)];
    }
    return [...red, x];
  }, []);
}

export function findSelectedKey(arr, path = [], current) {
  return arr.map((item) => {
    const currentPath = [...path, item.name];
    if (item.link === current) return currentPath;
    if (item.children && item.children.length) {
      return findSelectedKey(item.children, currentPath, current);
    }
    return null;
  }).filter(x => !!x);
}
