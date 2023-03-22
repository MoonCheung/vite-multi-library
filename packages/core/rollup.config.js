import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import dts from 'rollup-plugin-dts';
import babel from '@rollup/plugin-babel';
import banner from '../../scripts/banner.js';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import createBabelConfig from '../../babel.config.js';

const extensions = ['.js', '.ts', '.tsx'];

const require = createRequire(import.meta.url);

const pkg = require(`./package.json`);

export default [
  {
    input: './src/index.ts',
    output: [
      {
        name: pkg.name,
        file: pkg.module,
        format: 'esm',
        banner: banner('core'),
        sourcemap: true,
        extend: true
      },
      {
        name: pkg.name,
        file: pkg.main,
        format: 'cjs',
        banner: banner('core'),
        sourcemap: true,
        extend: true
      },
      {
        name: pkg.name,
        format: 'iife',
        file: pkg.unpkg,
        banner: banner('core'),
        sourcemap: true,
        extend: true
      }
    ],
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: './tsconfig.json'
      }),
      commonjs(),
      babel({
        ...createBabelConfig(),
        babelHelpers: 'bundled',
        extensions
      })
    ]
  },
  {
    input: './src/index.ts',
    output: [{ file: pkg.types, format: 'esm' }],
    plugins: [
      dts({
        compilerOptions: {
          preserveSymlinks: false
        }
      })
    ]
  }
];
