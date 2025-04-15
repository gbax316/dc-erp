import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',  // Allow connections from all IPs
  },
  preview: {
    port: 3000,
    host: '0.0.0.0',  // Allow connections from all IPs
  },
  // Add a base path if deployed in a subdirectory
  base: '/',
}) 