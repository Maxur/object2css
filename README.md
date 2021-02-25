# Object 2 CSS
This project allows you to generate CSS from JavaScript/Typescript object.

## Using "mod.ts"
```ts
import { object2css } from './mod.ts';
// const obj = ...
console.log(object2css(obj)); // Convert obj to css and display to console
```

## Using Deno "generate.ts"
```sh
# Help
deno run generate.ts --help

# General usage (w/ watch)
deno run --allow-read --allow-write generate.ts [INPUT_FILE] [OUTPUT_FILE] --watch

# Console output only
deno run --allow-read generate.ts [INPUT_FILE]
```

## Example
Input:
```ts
import { loop } from './mod.ts';

export default {
  'html, body': { // Simple selector
    margin: 0, // Simple property
    padding: 0,
  },
  '.main': {
    margin: `${1/2}rem`, // Computed property
    ...loop(['top', 'bottom'], (k) => ({ // Loop helper
      [`border-${k}`]: '1px solid #aaa',
    })),
    '.test': { // Will create a ".main .test" selector
      color: '#f55',
      '&.center': { // The character '&' allows you to combine with the parent selector ".main .test.center"
        'text-align': 'center',
      },
    },
  },
}
```
Output:
```css
html, body {
  margin: 0;
  padding: 0;
}

.main {
  margin: 0.5rem;
  border-top: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
}

.main .test {
  color: #f55;
}

.main .test.center {
  text-align: center;
}
```
