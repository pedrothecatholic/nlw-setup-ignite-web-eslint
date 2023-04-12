import { defineConfig } from 'vite';

import { resolve } from 'path';

import eslintPlugin from 'vite-plugin-eslint';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000,

    outDir: './build'
  },

  plugins: [react(), eslintPlugin()],

  resolve: {
    alias: [
      {
        find: 'assets',

        replacement: resolve(__dirname, 'src/assets')
      },

      {
        find: 'components',

        replacement: resolve(__dirname, 'src/components')
      },

      {
        find: 'lib',

        replacement: resolve(__dirname, 'src/lib')
      },

      {
        find: 'styles',

        replacement: resolve(__dirname, 'src/styles')
      },

      {
        find: 'utils',

        replacement: resolve(__dirname, 'src/utils')
      }
    ]
  }
});
