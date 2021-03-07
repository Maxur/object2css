import { assertEquals } from '../deps.ts';
import { loop } from '../mod.ts';

Deno.test('function loop', () => {
  assertEquals(
    loop(['a', 'b', 'c'], (v) => ({ [`x${v}`]: v.toUpperCase() })),
    {
      xa: 'A',
      xb: 'B',
      xc: 'C',
    }
  );
});
