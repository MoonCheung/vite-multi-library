/// <reference types="vitest"/>
import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import banner from '../../scripts/banner.js';
import react from '@vitejs/plugin-react';

const require = createRequire(import.meta.url);

const pkg = require(`./package.json`);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ fastRefresh: false })],
  worker: {
    plugins: [react()]
  },
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
      external: ['react', 'react-dom'],
      output: {
        banner: banner('react'),
        exports: 'named',
        extend: true,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
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
