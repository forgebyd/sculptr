import { defineConfig } from 'tsdown';

export default defineConfig({
  name: '@sculptr/cli',

  entry: ['source/index.ts', 'source/commands/*.ts', 'source/plugins/*.ts'],
  outputOptions: {
    dir: 'dist',
  },
});
