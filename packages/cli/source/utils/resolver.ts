import { readdir } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * Resolve path to commands directory
 *
 * @returns {string}
 */
export const resolveCommandsDir = (root: string): string => {
  return resolve(root, 'commands');
};

/**
 * Resolve path to plugins directory
 *
 * @returns {string}
 */
export const resolvePluginsDir = (root: string): string => {
  return resolve(root, 'plugins');
};

/**
 * Resolve the module name for a given file.
 *
 * @param {string} file
 * @returns {string}
 */
export const resolveModuleName = (file: string): string => {
  return basename(file, file.endsWith('.ts') ? '.ts' : '.js');
};

/**
 * Resolve the module path for a given set of segments.
 *
 * @param {string[]} segments
 * @returns {string}
 */
export const resolveModulePath = (...segments: string[]): string => {
  return pathToFileURL(join(...segments)).toString();
};

/**
 * Iterate over files in a directory and execute a callback for each file.
 *
 * @param {string} dir
 * @param {(file: string) => void | Promise<void>} callback
 */
export const tapToDir = async (
  dir: string,
  callback: (file: string) => void | Promise<void>
): Promise<void> => {
  try {
    for (const file of await readdir(dir)) {
      await callback(file);
    }
  } catch (error) {
    if (
      error instanceof Error &&
      'code' in error &&
      typeof error.code === 'string'
    ) {
      switch (error.code) {
        case 'ENOENT':
          throw new Error(`Directory not found: ${dir}`);
        case 'ENOTDIR':
          throw new Error(`Specified path is not a directory: ${dir}`);
        default:
          break;
      }
    }

    throw error;
  }
};
