import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'robots.txt',
          dest: ''
        }
      ]
    })
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use 'src/styles/mixins' as *;`,
        api: 'modern-compiler'
      }
    }
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src')
    }
  }
});
