import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import * as url from 'url';
import buildCore from './build-core.js';
import buildTypes from './build-types.js';
import buildVue from './build-vue.js';
import buildReact from './build-react.js';

console.log(chalk.cyan('Watching file changes ...'));

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const watchFunction = async (fileName) => {
  // if (fileName.includes('.less') || fileName.includes('.css') || fileName.includes('.scss')) {
  //   console.log('Building styles');
  //   await buildStyles();
  //   return;
  // }
  if (fileName.includes('.d.ts')) {
    console.log('Building Types');
    await buildTypes();
    return;
  }
  if (fileName.includes('react')) {
    console.log('Building React');
    buildReact();
    return;
  }
  if (fileName.includes('vue')) {
    console.log('Building Vue');
    buildVue();
    return;
  }
  if (fileName.includes('.ts')) {
    console.log('Building scripts');
    buildCore();
    return;
  }
  console.log('something wrong...');
}

let watchTimeout;
fs.watch(path.resolve(__dirname, '../packages'), { recursive: true }, (eventType, fileName) => {
  clearTimeout(watchTimeout);
  watchTimeout = setTimeout(() => {
    watchFunction(fileName);
  }, 100);
});