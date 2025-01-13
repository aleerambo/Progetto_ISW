import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // Reindirizza al backend le richieste che iniziano con /api
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
})
