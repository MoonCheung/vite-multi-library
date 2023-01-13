import path from 'path';
import fs from 'fs-extra';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default async (cb) => {
  const env = process.env.NODE_ENV || 'development';
  const outputDir = env === 'development' ? 'build' : 'package';

  // core type file
  const coreContent = fs.readFileSync(path.resolve(__dirname, '../packages/index.d.ts'), 'utf-8');
  fs.writeFileSync(path.resolve(__dirname, `../${outputDir}/img-uploader.d.ts`), coreContent);

  // react type file
  const reactContent = fs.readFileSync(
    path.resolve(__dirname, '../packages/react/src/index.d.ts'),
    'utf-8',
  );
  fs.writeFileSync(path.resolve(__dirname, `../${outputDir}/react/index.d.ts`), reactContent);

  // vue type file
  const vueContent = fs.readFileSync(
    path.resolve(__dirname, '../packages/vue/src/index.d.ts'),
    'utf-8',
  );
  fs.writeFileSync(path.resolve(__dirname, `../${outputDir}/vue/index.d.ts`), vueContent);

  console.log('Types build completed!');
}