import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import MonacoEditorPlugin from 'vite-plugin-monaco-editor-esm';
import tsconfigPaths from 'vite-tsconfig-paths';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    MonacoEditorPlugin({}),
    tsconfigPaths(),
  ],
});
