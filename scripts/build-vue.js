import fs from 'fs-extra';
import execSh from 'exec-sh';
import banner from './banner.js';

const exec = execSh.promise;

export default async () => {
  const format = 'esm';
  const env = process.env.NODE_ENV || 'development';
  const outputDir = env === 'development' ? 'build' : 'packages';

  // Exec Babel
  await exec(
    `cross-env MODULES=${format} npx babel --config-file ./scripts/babel/babel.config.vue.js packages/vue/src/index.tsx --out-file ${outputDir}/vue/img-uploader-vue.${format}.js`,
  );

  // Add banner
  let fileContent = await fs.readFile(`./${outputDir}/vue/img-uploader-vue.${format}.js`, 'utf-8');
  fileContent = `${banner('Vue')}\n${fileContent}`;
  await fs.writeFile(`./${outputDir}/vue/img-uploader-vue.${format}.js`, fileContent);

  console.log('Vue build completed!');
} 
