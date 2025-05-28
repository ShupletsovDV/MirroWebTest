import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['localhost'],
    proxy: {
      '/api': {
        target: 'http://localhost:5041/', 
        changeOrigin: true,
        secure: false, 
        rewrite: (path) => path.replace(/^\/api/, 'api'),
      },
    },
  },
})
