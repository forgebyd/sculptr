import { readdir } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import type { Command, LazyCommand } from '@gunshi/bone';
import type { Plugin } from '@gunshi/plugin';

type BootstrapContext = {
  commands: Map<string, Command | LazyCommand>;
  plugins: Plugin[];
};

type BootstrapCallback = (context: BootstrapContext) => void | Promise<void>;

const srcDir = dirname(fileURLToPath(import.meta.url));
const commandsDir = resolve(srcDir, 'commands');
const pluginsDir = resolve(srcDir, 'plugins');

/**
 * Resolve commands from the commands directory
 * dynamically and add them to the context.
 *
 * @param {BootstrapContext} context
 * @return {Promise<void>}
 */
const resolveCommands = async (context: BootstrapContext): Promise<void> => {
  for (const file of await readdir(commandsDir)) {
    if (file.endsWith('.ts') || file.endsWith('.js')) {
      const commandName = basename(file, file.endsWith('.ts') ? '.ts' : '.js');
      const commandModule = await import(
        pathToFileURL(join(commandsDir, file)).toString()
      );

      if (!commandModule.default) {
        // make sure the command has default exported
        throw new TypeError(
          `Command module "${commandName}" does not have a default export.`
        );
      }

      context.commands.set(commandName, commandModule.default);
    }
  }
};

/**
 * Resolve plugins from the plugins directory
 * dynamically and add them to the context.
 *
 * @param {BootstrapContext} context
 * @return {Promise<void>}
 */
const resolvePlugins = async (context: BootstrapContext): Promise<void> => {
  for (const file of await readdir(pluginsDir)) {
    if (file.endsWith('.ts') || file.endsWith('.js')) {
      const pluginName = basename(file, file.endsWith('.ts') ? '.ts' : '.js');
      const pluginModule = await import(
        pathToFileURL(join(pluginsDir, file)).toString()
      );

      if (!pluginModule.default) {
        // make sure the plugin has a default exported
        throw new TypeError(
          `Plugin module "${pluginName}" does not have a default export.`
        );
      }

      context.plugins.push(pluginModule.default);
    }
  }
};

export default async (callback: BootstrapCallback): Promise<void> => {
  const context: BootstrapContext = {
    commands: new Map(),
    plugins: [],
  };

  await resolveCommands(context);
  await resolvePlugins(context);
  await callback(context);
};
