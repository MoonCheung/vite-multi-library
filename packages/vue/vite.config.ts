/// <reference types="vitest"/>
import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import dts from 'vite-plugin-dts';
import banner from '../../scripts/banner';
import vue from '@vitejs/plugin-vue';
import vueJSX from '@vitejs/plugin-vue-jsx';

const require = createRequire(import.meta.url);

const pkg = require(`./package.json`);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({ insertTypesEntry: true }), vue(), vueJSX()],
  build: {
    lib: {
      name: pkg.name,
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es', 'cjs', 'iife'],
      fileName: (format) => {
        switch (format) {
          case 'es':
            return pkg.module;
          case 'cjs':
            return pkg.main;
          case 'iife':
            return pkg.unpkg;
        }
      }
    },
    minify: false,
    rollupOptions: {
      external: ['vue'],
      output: {
        banner: banner('vue'),
        exports: 'named',
        extend: true,
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: 'src/setupTests',
    mockReset: true,
    transformMode: {
      web: [/\.[jt]sx$/]
    }
  }
});
