import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      output: 'public/sitemap.xml',
      hostname: 'https://platzua.com',
      changefreq: 'daily',
      priority: 0.8,
      urls: [
        { url: '/', changefreq: 'daily', priority: 1.0 },
        { url: '/how-it-works', changefreq: 'monthly', priority: 0.7 },
        { url: '/privacy-policy', changefreq: 'monthly', priority: 0.7 },
        { url: '/create', changefreq: 'monthly', priority: 0.7 }
      ]
    })
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html'
    }
  }
});
