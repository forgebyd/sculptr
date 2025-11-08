import { defineConfig } from 'tsdown';

export default defineConfig({
  name: '@sculptr/cli',

  entry: 'source/index.ts',
  outputOptions: {
    dir: 'dist',
  },
});
