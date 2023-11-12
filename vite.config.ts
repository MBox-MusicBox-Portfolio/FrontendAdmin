import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
//    base: '/admin',
// publicPath: '/admin',

/*
export default defineConfig({
    base: '/admin',
    mode: 'development',
    plugins: [vue(), basicSsl()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@store': path.resolve(__dirname, './src/store'),
            '@components': path.resolve(__dirname, './src/components'),
            '@modules': path.resolve(__dirname, './src/modules'),
            '@pages': path.resolve(__dirname, './src/pages'),
        }
    }
});

*/

export default defineConfig({
    base: '/admin',
    mode: 'development',
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
            '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
            '@modules': fileURLToPath(new URL('./src/modules', import.meta.url)),
            '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
        }
    }
});
