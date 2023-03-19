import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // we alias to the lib's source files in dev
      // so we don't need to rebuild the lib over and over again
      '@img-uploader/react':
        process.env.NODE_ENV === 'production' ? '@img-uploader/react' : '@img-uploader/react/src/index.ts'
    },
    dedupe: ['react']
  },
  server: {
    port: 8081
  },
  optimizeDeps: {
    exclude: ['@img-uploader/react']
  }
});
