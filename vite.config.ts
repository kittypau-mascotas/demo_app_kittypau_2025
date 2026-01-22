import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Definimos 'client' como la raíz porque ahí parece estar tu index.html
  root: 'client',
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'client/src'),
      '@shared': path.resolve(process.cwd(), 'shared'),
      '@lib': path.resolve(process.cwd(), 'lib'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Redirige las peticiones API al backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  }
});