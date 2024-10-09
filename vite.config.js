import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap'; // Імпорт плагіна

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      output: 'public/sitemap.xml', // Шлях для збереження сайт-карти
      hostname: 'https://platz-ua-front.vercel.app', // Ваше доменне ім'я
      // Додаткові параметри можна налаштувати тут, наприклад:
      changefreq: 'daily', // Як часто змінюються сторінки
      priority: 0.8, // Пріоритет для сторінок
      exclude: ['/404', '/login'] // Виключення сторінок
    })
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html'
    }
  }
});
