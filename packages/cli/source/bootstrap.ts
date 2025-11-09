import type { Command, LazyCommand } from '@gunshi/bone';
import type { Plugin } from '@gunshi/plugin';
import {
  resolveCommandsDir,
  resolveModuleName,
  resolveModulePath,
  resolvePluginsDir,
  tapToDir,
} from './utils/resolver.js';

type BootstrapContext = {
  commands: Map<string, Command | LazyCommand>;
  plugins: Plugin[];
};

type BootstrapCallback = (context: BootstrapContext) => void | Promise<void>;

/**
 * Resolve commands from the commands directory
 * dynamically and add them to the context.
 *
 * @param {BootstrapContext} context
 * @return {Promise<void>}
 */
const resolveCommands = async (context: BootstrapContext): Promise<void> => {
  const dir = resolveCommandsDir(import.meta.dirname);

  await tapToDir(dir, async (file) => {
    if (file.endsWith('.ts') || file.endsWith('.js')) {
      const commandName = resolveModuleName(file);
      const commandPath = resolveModulePath(dir, file);
      const commandModule = await import(commandPath);

      // make sure the command has default exported
      if (!commandModule.default) {
        throw new TypeError(
          `Command module "${commandName}" does not have a default export.`
        );
      }

      context.commands.set(commandName, commandModule.default);
    }
  });
};

/**
 * Resolve plugins from the plugins directory
 * dynamically and add them to the context.
 *
 * @param {BootstrapContext} context
 * @return {Promise<void>}
 */
const resolvePlugins = async (context: BootstrapContext): Promise<void> => {
  const dir = resolvePluginsDir(import.meta.dirname);

  await tapToDir(dir, async (file) => {
    if (file.endsWith('.ts') || file.endsWith('.js')) {
      const pluginName = resolveModuleName(file);
      const pluginPath = resolveModulePath(dir, file);
      const pluginModule = await import(pluginPath);

      // make sure the plugin has a default exported
      if (!pluginModule.default) {
        throw new TypeError(
          `Plugin module "${pluginName}" does not have a default export.`
        );
      }

      context.plugins.push(pluginModule.default);
    }
  });
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
