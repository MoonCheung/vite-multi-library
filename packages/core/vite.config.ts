/// <reference types="vitest"/>

import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import banner from '../../scripts/banner'

const require = createRequire(import.meta.url)

const pkg = require(`./package.json`)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({ insertTypesEntry: true })],
  build: {
    lib: {
      name: pkg.name,
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es', 'cjs', 'iife'],
      fileName: (format) => {
        switch (format) {
          case 'es':
            return pkg.module
          case 'cjs':
            return pkg.main
          case 'iife':
            return pkg.unpkg
        }
      }
    },
    minify: false,
    rollupOptions: {
      output: {
        banner: banner('core'),
        exports: 'named',
        extend: true
      }
    }
  }
})
