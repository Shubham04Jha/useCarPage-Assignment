import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api': {
        target: 'https://localhost:7006',
        // target: 'https://www.carwale.com',
        // target: 'https://stg.carwale.com',
        changeOrigin: true,
      },
    }
  },
})
