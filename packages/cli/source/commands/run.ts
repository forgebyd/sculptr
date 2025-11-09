import {
  type CommandLoader,
  type DefaultGunshiParams,
  define,
  lazy,
} from '@gunshi/definition';
import chalk from 'chalk';

const commandDefinition = define({
  name: 'run',
  description: 'Run generator specified by its name',
  args: {
    generator: {
      type: 'positional',
      description: 'Name of the generator to run',
    },
  },
  examples: (ctx) =>
    [
      'Basic Usage:',
      chalk.dim(`$ pnpm ${ctx.env.name} ${ctx.name} my-generator`),
      '',
      'Use With Custom Options:',
      chalk.dim(`$ pnpm ${ctx.env.name} ${ctx.name} my-generator --verbose`),
      chalk.dim(`$ pnpm ${ctx.env.name} ${ctx.name} my-generator --dry`),
      '',
      'Use With Another Package Managers:',
      chalk.dim(`$ yarn ${ctx.env.name} ${ctx.name} my-generator`),
      chalk.dim(`$ yarn ${ctx.env.name} ${ctx.name} my-generator -V`),
      chalk.dim(`$ npm run ${ctx.env.name} -- ${ctx.name} my-generator`),
      chalk.dim(`$ npm run ${ctx.env.name} -- ${ctx.name} my-generator -V`),
    ].join('\n'),
});

const commandLoader: CommandLoader<
  DefaultGunshiParams & typeof commandDefinition
> = () => (ctx) => {
  // TODO : Implement generator running logic here
  console.log(ctx.values);
};

export default lazy(commandLoader, commandDefinition);
