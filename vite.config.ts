import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Deployed to GitHub Pages project site: https://gojump0713.github.io/company/
export default defineConfig({
  base: '/company/',
  plugins: [react(), tailwindcss()],
  // three.js (Vanta) is lazy-loaded into its own chunk; raise the warning limit.
  build: { chunkSizeWarningLimit: 800 },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
