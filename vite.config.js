import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import VitePluginSass from 'vite-plugin-sass'; // Зверніть увагу, що використовується дефолтний імпорт

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginSass() // Використовуйте без деструктуризації, тому що це дефолтний експорт
  ],
  base: '/platz-ua-front/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
