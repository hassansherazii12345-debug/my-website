import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  server: {
    host: '0.0.0.0',  // Listen on all network IP interfaces
    port: 5173,       // Lock to standard port
    strictPort: true, // Crash if duplicated (fixes "phantom" server mismatch)
    https: false,     // Standard HTTP to prevent security certificate blocks
    cors: true,       // Ensure mobile browsers aren't rejecting cross-device network fetches
    allowedHosts: true // Allow localtunnel/ngrok to bypass security headers
  }
})
