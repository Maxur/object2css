import { assertEquals } from '../deps.ts';
import { kebabCase } from '../mod.ts';

Deno.test('function kebabCase', () => {
  assertEquals(
    kebabCase('this-is-a-test'),
    'this-is-a-test',
  );
  assertEquals(
    kebabCase('thisIsATest'),
    'this-is-a-test',
  );
  assertEquals(
    kebabCase('ThisIsATest'),
    'this-is-a-test',
  );
  assertEquals(
    kebabCase('this_is_a_test'),
    'this-is-a-test',
  );
  assertEquals(
    kebabCase('This Is A Test'),
    'this-is-a-test',
  );
  assertEquals(
    kebabCase('this is a test'),
    'this-is-a-test',
  );
});
