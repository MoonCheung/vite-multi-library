import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJSX()],
  resolve: {
    alias: {
      // we alias to the lib's source files in dev
      // so we don't need to rebuild the lib over and over again
      '@img-uploader/vue':
        process.env.NODE_ENV === 'production' ? '@img-uploader/vue' : '@img-uploader/vue/src/index.ts'
    },
    dedupe: ['vue']
  },
  server: {
    port: 8080
  },
  optimizeDeps: {
    exclude: ['@img-uploader/vue']
  }
})
