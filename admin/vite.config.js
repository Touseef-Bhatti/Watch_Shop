import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {port: 5174},
  root: process.cwd(),
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'terser'
  }
})
