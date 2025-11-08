import { cli } from '@gunshi/bone';
import pluginGlobal from '@gunshi/plugin-global';
import pluginRenderer from '@gunshi/plugin-renderer';
import chalk from 'chalk';
import bootstrap from './bootstrap.js';

bootstrap(async (context) => {
  await cli(
    process.argv.slice(2),
    {
      args: {
        generator: {
          type: 'string',
          short: 'G',
          description: 'Name of the file generator to run',
          default: '',
        },
      },
    },
    {
      name: 'sculptr',
      description: 'Lightweight file generator CLI tool',
      version: '0.0.0',
      plugins: [pluginGlobal(), pluginRenderer(), ...context.plugins],
      subCommands: context.commands,
      usageOptionType: true,
      usageOptionValue: true,
      usageSilent: false,
    }
  );
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
