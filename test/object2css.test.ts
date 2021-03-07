import { assertEquals } from '../deps.ts';
import { object2css } from '../mod.ts';

Deno.test('function object2css', () => {
  assertEquals(
    object2css(
      {
        'html, body': {
          margin: 0,
          padding: 0,
        },
        '.main': {
          margin: `${1/2}rem`,
        },
      }
    ),
    'html, body{margin:0;padding:0;}.main{margin:0.5rem;}',
  );
  assertEquals(
    object2css(
      {
        '.main': {
          borderTop: '1rem',
          '&.t1': {
            padding: 0,
          },
          '.t1': {
            margin: 0,
          },
        },
      }
    ),
    '.main{border-top:1rem;}.main.t1{padding:0;}.main .t1{margin:0;}',
  );
});
