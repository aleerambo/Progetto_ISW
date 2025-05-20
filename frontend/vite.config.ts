import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Indirizzo del backend
        changeOrigin: true, // Cambia l'host dell'header origin alla destinazione
        secure: false, // Disattiva la verifica del certificato SSL (se necessario)
        //rewrite: (path) => path.replace(/^\/api/, ''), // Rimuove il prefisso /api se richiesto
      },
    },
  },
})
