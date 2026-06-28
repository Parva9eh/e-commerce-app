import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'svg-mock',
      enforce: 'pre',
      load(id) {
        if (id.endsWith('.svg?react') || (id.endsWith('.svg') && !id.includes('node_modules'))) {
          return `
            import { createElement } from 'react';
            export const ReactComponent = (props) =>
              createElement('svg', { 'data-testid': 'mock-svg', ...props });
            export default 'svg-mock-url';
          `;
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/vitest.setup.ts',
    testTimeout: 10000,
    exclude: ['**/node_modules/**', '**/e2e/**', 'playwright.config.ts'],
  },
});