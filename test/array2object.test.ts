import { assertEquals } from '../deps.ts';
import { array2object } from '../mod.ts';

Deno.test('function loop', () => {
  assertEquals(
    array2object(['a', 'b', 'c'], (v) => ({ [`x${v}`]: v.toUpperCase() })),
    {
      xa: 'A',
      xb: 'B',
      xc: 'C',
    }
  );
  assertEquals(
    array2object(['a', 'b', 'c'], (v, i) => ({ [`x${v}`]: i })),
    {
      xa: 0,
      xb: 1,
      xc: 2,
    }
  );
});
