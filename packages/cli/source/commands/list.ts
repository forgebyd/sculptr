import type { Command, CommandLoader } from '@gunshi/bone';
import { define, lazy } from '@gunshi/definition';
import chalk from 'chalk';

const commandDefinition: Command = define({
  name: 'list',
  description: 'List file generators',
  examples: (ctx) => {
    return [
      'Basic usage:',
      chalk.dim(`$ pnpm sculptr ${ctx.name}`),
      '',
      'With options provided:',
      chalk.dim(`$ pnpm sculptr ${ctx.name} -C sculptr.config.ts`),
    ].join('\n');
  },
});

const commandLoader: CommandLoader = () => {
  return (context) => {
    console.log(context.name);
  };
};

export default lazy(commandLoader, commandDefinition);
