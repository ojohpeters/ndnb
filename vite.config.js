import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: 'localhost',
        hmr: {
            protocol: 'ws',
            host: 'localhost',
            port: 5173,
        },
        watch: {
            ignored: ['**/vendor/**'],
        },
    },
});
