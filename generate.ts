import { parse } from './deps.ts';
import { object2css } from './mod.ts';

function displayHelp() {
  console.log(`Usage : ${import.meta.url.split('/').slice(-1)} [INPUT] [OUTPUT] [OPTIONS]`);
  console.log('Generate CSS from Object\n');
  console.log('  --help\tShow help');
  console.log('  --watch\tUpdate on change');
}

async function outputCss(input: string, output: string) {
  const mod = await import(`${input}?${Math.random()}.ts`);
  if (output === '') {
    console.log(object2css(mod.default));
  } else {
    Deno.writeTextFileSync(output, object2css(mod.default));
  }
}

async function main(args: string[]) {
  const arg = parse(args);
  if (arg._.length === 0 || arg.help) {
    return displayHelp();
  }
  const [inputCmd, outputCmd] = arg._;
  const input = Deno.realPathSync(inputCmd.toString());
  let output = '';
  if (outputCmd) {
    output = Deno.realPathSync(outputCmd.toString());
  }
  await outputCss(input, output);
  if (arg.watch) {
    const watcher = Deno.watchFs(input);
    for await (const event of watcher) {
      if (event.kind === 'access') {
        await outputCss(input, output);
      }
    }
  }
}

if (import.meta.main) {
  main(Deno.args);
}
