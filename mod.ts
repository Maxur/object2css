const PARENT_CHAR = '&';

interface Prop {
  [key: string]: Prop | string | number;
}

function loop<T>(array: T[], fn: (value: T) => Prop) {
  return array.reduce((acc, a) => ({
    ...acc,
    ...fn(a),
  }),
  {});
}

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
        css += `${prop}:${value};`;
      }
    }
    css += '}';
    for (const k in subSelectors) {
      css += object2css(subSelectors[k]);
    }
  }
  return css;
}

export { object2css, loop };
