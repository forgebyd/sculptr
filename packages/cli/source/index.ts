import { cli } from '@gunshi/bone';
import pluginGlobal from '@gunshi/plugin-global';
import pluginRenderer from '@gunshi/plugin-renderer';
import chalk from 'chalk';
import pkg from '../package.json' with { type: 'json' };
import bootstrap from './bootstrap.js';

bootstrap(async (ctx) => {
  const cliOptions: Parameters<typeof cli>[2] = {
    name: 'sculptr',
    description: 'Lightweight file generator CLI tool',
    version: pkg.version,
    plugins: [pluginGlobal(), pluginRenderer(), ...ctx.plugins],
    subCommands: ctx.commands,
    usageOptionType: true,
    usageOptionValue: true,
    usageSilent: false,
  };

  const cliArgv: Parameters<typeof cli>[0] = process.argv.slice(2);
  const cliEntry: Parameters<typeof cli>[1] = {
    args: {
      generator: {
        type: 'string',
        short: 'G',
        description: 'Name of the file generator to run',
        default: '',
      },
    },
    examples: () =>
      [
        'Basic Usage:',
        chalk.dim('$ pnpm sculptr'),
        '',
        'Run Specific Generator:',
        chalk.dim('$ pnpm sculptr --generator my-generator'),
        '',
        'Use Custom Configuration File:',
        chalk.dim('$ pnpm sculptr --config sculptr.config.ts'),
        '',
        'Use Custom Options:',
        chalk.dim('$ pnpm sculptr --verbose'),
        chalk.dim('$ pnpm sculptr --dry'),
        '',
        'Use Another Package Managers:',
        chalk.dim('$ yarn sculptr'),
        chalk.dim('$ yarn sculptr --generator my-generator'),
        chalk.dim('$ npm run sculptr --'),
        chalk.dim('$ npm run sculptr -- --generator my-generator'),
      ].join('\n'),
  };

  await cli(cliArgv, cliEntry, cliOptions);
}).catch((error: Error) => {
  console.error(
    [
      chalk.bgRed.white(` ${error.constructor.name} `),
      chalk.white(error.message),
    ].join(' ')
  );

  // gracefully exit without error
  process.exit(0);
});
