import {
  type CommandLoader,
  type DefaultGunshiParams,
  define,
  lazy,
} from '@gunshi/definition';
import chalk from 'chalk';

const commandDefinition = define({
  name: 'list',
  description: 'List all available generators',
  examples: (ctx) =>
    [
      'Basic Usage:',
      chalk.dim(`$ pnpm ${ctx.env.name} ${ctx.name}`),
      '',
      'Use With Another Package Managers:',
      chalk.dim(`$ yarn ${ctx.env.name} ${ctx.name}`),
      chalk.dim(`$ npm run ${ctx.env.name} -- ${ctx.name}`),
    ].join('\n'),
});

const commandLoader: CommandLoader<
  DefaultGunshiParams & typeof commandDefinition
> = () => (ctx) => {
  // TODO : Implement the logic to list all available generators
  console.log(ctx.values);
};

export default lazy(commandLoader, commandDefinition);
