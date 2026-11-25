import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  server: { host: '127.0.0.1', port: 5174, open: '/studio.html' },
  build: { outDir: 'dist-studio', rollupOptions: { input: resolve(import.meta.dirname, 'studio.html') } },
})
