import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js'
        }
    },
    server: {
        host: 'localhost',
        port: 5173
    },
    server: {
        proxy: {
          '/': {
            target: 'http://127.0.0.1:8000', // Cambia al puerto de Laravel
            changeOrigin: true
          }
        }
      }
});
