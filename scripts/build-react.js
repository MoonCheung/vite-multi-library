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
    `cross-env MODULES=${format} npx babel --config-file ./scripts/babel/babel.config.react.js packages/react/src/index.tsx --out-file ${outputDir}/react/img-uploader-react.${format}.js`,
  );

  // Add banner
  let fileContent = await fs.readFile(`./${outputDir}/react/img-uploader-react.${format}.js`, 'utf-8');
  fileContent = `${banner('React')}\n${fileContent}`;
  await fs.writeFile(`./${outputDir}/react/img-uploader-react.${format}.js`, fileContent);

  console.log('React build completed!');
}
