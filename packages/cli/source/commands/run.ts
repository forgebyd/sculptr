import type { Command, CommandLoader, DefaultGunshiParams } from '@gunshi/bone';
import { define, lazy } from '@gunshi/definition';
import chalk from 'chalk';

const commandDefinition: Command = define({
  name: 'run',
  description: 'Run file generator',
  args: {
    generator: {
      type: 'positional',
      description: 'Name of the file generator to run',
    },
  } as DefaultGunshiParams['args'],
  examples: (ctx) => {
    return [
      'Basic usage:',
      chalk.dim(`$ pnpm sculptr ${ctx.name} my-generator`),
      '',
      'With options provided:',
      chalk.dim(`$ pnpm sculptr ${ctx.name} my-generator -V`),
      chalk.dim(`$ pnpm sculptr ${ctx.name} my-generator -D`),
      chalk.dim(`$ pnpm sculptr ${ctx.name} my-generator -VD`),
      '',
      'With custom package manager:',
      chalk.dim(`$ yarn sculptr ${ctx.name} my-generator`),
      chalk.dim(`$ npm run sculptr -- ${ctx.name} my-generator`),
      '',
      'Note:',
      "- Use '--dry' option to perform a dry run without making changes.",
      "- Please note that 'pnpm' is optional and can be replaced",
      '  with or without any package manager of your choice.',
    ].join('\n');
  },
});

const commandLoader: CommandLoader = () => {
  return (context) => {
    console.log(context.name);
  };
};

export default lazy(commandLoader, commandDefinition);
