import path from 'path';
import fs from 'fs-extra';
import { minify } from 'terser';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import banner from './scripts/banner.js';
import dts from 'rollup-plugin-dts';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import createBabelConfig from './babel.config.js';

const prod = !process.env.ROLLUP_WATCH;

const files = fs.readdirSync('packages');

const extensions = ['.js', '.ts', '.tsx'];
const require = createRequire(import.meta.url);
const __dirname = fileURLToPath(new URL('.', import.meta.url));

const packageDir = path.resolve(__dirname, 'packages');
const pkg = require(`${__dirname}/package.json`);

const resolve = (p) => path.resolve(packageDir, p);
const entryFile = (name) => resolve(`${name}/src/index.ts`);

/**
 * get babel config
 * @param {*} config
 * @returns
 */
function getBabelConfig(config = {}) {
  return {
    ...createBabelConfig(),
    ...config,
    babelHelpers: 'bundled',
    extensions
  };
}

const outputConfig = Object.create(null);

const isFrame = (param) => (/(vue|react)/i.test(param) ? `-${param}` : '');

outputConfig.outputEsmConfig = function (name, file) {
  return {
    file: resolve(`${file}/dist/${name}${isFrame(file)}.esm.js`),
    format: 'esm',
    banner: banner(file),
    sourcemap: prod
    // Future expansion output config
  };
};

outputConfig.outputCjsConfig = function (name, file) {
  return {
    file: resolve(`${file}/dist/${name}${isFrame(file)}.cjs.js`),
    format: 'cjs',
    banner: banner(file),
    sourcemap: prod
    // Future expansion output config
  };
};

outputConfig.outputIifeConfig = function (name, file) {
  const firstUpperCase = (str) =>
    str.split(/[\-\|\_]/gi).reduce((acc, [first, ...rest]) => (acc += first.toUpperCase() + rest.join('')), '');
  return {
    name: firstUpperCase(`${name}-${file}`),
    format: 'iife',
    file: resolve(`${file}/dist/${name}${isFrame(file)}.global.js`),
    banner: banner(file),
    sourcemap: prod
    // Future expansion output config
  };
};

function createFramePlugin(file) {
  const isCommonjs = /(vue|core)/i.test(file) ? null : commonjs({ extensions });
  const isVuePlugin = /(react|core)/i.test(file)
    ? {}
    : {
        plugins: ['@vue/babel-plugin-jsx']
      };

  return [
    nodeResolve(),
    typescript({
      tsconfig: resolve(`${file}/tsconfig.json`)
    }),
    isCommonjs,
    babel(getBabelConfig(isVuePlugin))
  ];
}

function genDynamicFun(target, name, file) {
  const firstUpperformat = ([first, ...rest]) => first.toUpperCase() + rest.join('');
  return target.map((format) => outputConfig[`output${firstUpperformat(format)}Config`](name, file));
}

export default function (args) {
  return [
    ...files.map((file) => {
      return {
        input: entryFile(file),
        output: genDynamicFun(['esm', 'cjs', 'iife'], pkg.name, file),
        plugins: createFramePlugin(file)
      };
    }),
    ...files.map((file) => {
      return {
        input: entryFile(file),
        output: [{ file: resolve(`${file}/dist/${pkg.name}${isFrame(file)}.d.ts`), format: 'esm' }],
        plugins: [
          dts({
            compilerOptions: {
              preserveSymlinks: false
            }
          })
        ]
      };
    })
  ];
}
