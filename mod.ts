const PARENT_CHAR = '&';

interface Prop {
  [key: string]: Prop | string | number;
}

/**
 * Return the kebab case syntax from a string.
 * @param str The string.
 * @return Kebab case string.
*/
function kebabCase(str: string) {
  return (str.match(/(?:[A-Z0-9]+|(?:[A-Z]?[a-z0-9]+))(?=[A-Z _-]|\b)/g) || [])
    .join('-')
    .toLowerCase();
}

/**
 * Return a reduced object from an array.
 * @param array The array.
 * @param fn The function that return an object for each value / index.
 * @return Resulted object.
*/
function array2object<T, U extends object>(array: T[], fn: (value: T, index: number) => U) {
  return array.reduce((acc, a, i) => ({
    ...acc,
    ...fn(a, i),
  }),
  {} as U);
}

/**
 * Return a css string from an object.
 * @param obj The object.
 * @return Css string.
*/
function object2css(obj: Record<string, Prop>) {
  let css = '';
  for (const selector in obj) {
    const subSelectors: Record<string, Prop>[] = [];
    css += `${selector}{`;
    for (const prop in obj[selector]) {
      const value = obj[selector][prop];
      if (typeof value === 'object') {
        const p = prop[0] === PARENT_CHAR ? `${selector}${prop.slice(1)}` : `${selector} ${prop}`;
        subSelectors.push({ [p]: value });
      } else {
        css += `${kebabCase(prop)}:${value};`;
      }
    }
    css += '}';
    for (const k in subSelectors) {
      css += object2css(subSelectors[k]);
    }
  }
  return css;
}

export { kebabCase, array2object, object2css };
