import fs from 'fs-extra';
import { rollup } from 'rollup';
import { minify } from 'terser';
import banner from './banner.js';
import { babel } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

async function buildCore(format, browser) {
  const env = process.env.NODE_ENV || 'development';
  const external = format === 'umd' || browser ? [] : (m) => !m.includes('img-uploader.js');
  let filename = 'img-uploader';
  if (format !== 'umd') filename += `.${format}`;
  if (format === 'esm' && browser) filename += '.browser';
  const output = env === 'development' ? 'build' : 'packages';
  const needSourceMap = env === 'production' && (format === 'umd' || (format === 'esm' && browser));

  return rollup({
    input: './packages/index.ts',
    external,
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.FORMAT': JSON.stringify(format),
        'process.env.BROWSER': browser,
        ...(format === 'umd'
          ? {
              'export { img-uploader };': '',
            }
          : {}),
      }),
      nodeResolve({ mainFields: ['module', 'main', 'jsnext'], rootDir: './packages' }),
      // commonjs(),
      babel({ babelHelpers: 'bundled' }),
    ],
    onwarn() {},
  })
    .then((bundle) =>
      bundle.write({
        format,
        name: 'img-uploader',
        strict: true,
        sourcemap: needSourceMap,
        sourcemapFile: `./${output}/${filename}.js.map`,
        banner: banner(),
        file: `./${output}/${filename}.js`,
      }),
    )
    .then(async (bundle) => {
      if (format === 'esm') {
        // move esm files
        fs.ensureDirSync(`./${output}/esm/`);
        fs.readdirSync(`./${output}/`)
          .filter((f) => f.includes('.esm.'))
          .forEach((f) => {
            fs.renameSync(`./${output}/${f}`, `./${output}/esm/${f}`);
          });
      }
      if (env === 'development' || !browser) return;

      const result = bundle.output[0];
      const { code, map } = await minify(result.code, {
        sourceMap: {
          content: needSourceMap ? result.map : undefined,
          filename: needSourceMap ? `${filename}.min.js` : undefined,
          url: `${filename}.min.js.map`,
        },
        output: {
          preamble: banner(),
        },
      }).catch((err) => {
        console.error(`Terser failed on file ${filename}: ${err.toString()}`);
      });

      fs.writeFileSync(`./${output}/${filename}.min.js`, code);
      fs.writeFileSync(`./${output}/${filename}.min.js.map`, map);

      if (format === 'esm') {
        // move esm files
        fs.readdirSync(`./${output}/`)
          .filter((f) => f.includes('.esm.'))
          .forEach((f) => {
            fs.renameSync(`./${output}/${f}`, `./${output}/esm/${f}`);
          });
      }
    })
    .catch((err) => {
      console.error(err.toString());
    });
}

export default async function build(){
  await Promise.all([buildCore('esm', false), buildCore('esm', true), buildCore('umd', true)]);
  console.log('Scripts build completed!');
}