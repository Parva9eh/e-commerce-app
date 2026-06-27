/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-styled-components', { displayName: true }]],
      },
    }),
    svgr({
      svgrOptions: {
        exportType: 'named',
        namedExport: 'ReactComponent',
      },
      include: '**/*.svg',
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'crwn-192x192.png', 'crwn-512x512.png'],
      manifest: {
        short_name: 'Crwn',
        name: 'Crown Clothing',
        icons: [
          {
            src: 'crwn-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'crwn-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        start_url: '.',
        display: 'standalone',
        theme_color: '#000000',
        background_color: '#ffffff',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
      },
    }),
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/vitest.setup.ts',
    testTimeout: 10000,
  },
});