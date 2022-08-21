import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from "vite-plugin-singlefile"
import inject from '@rollup/plugin-inject'
import path from 'path'

export default defineConfig({
    base: "./",
    server: {
        open: true
    },
    build: {
        outDir: './docs',
        rollupOptions: {
            plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
        },
    },
    assetsInclude: ['**/*.png'],
    plugins: [react(), viteSingleFile()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
})