import { defineConfig } from 'tsdown';

export default defineConfig({
    clean: true,
    dts: true,
    minify: false,
    sourcemap: true,
    publint: true,
    platform: 'node',
    target: 'es2020',

    format: ['cjs', 'esm'],

    workspace: {
        include: ['packages/*'],
    },
});
