import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set VITE_BASE_URL for deployments below a subpath; production uses /.
export default defineConfig(({ isSsrBuild }) => ({
  base: process.env.VITE_BASE_URL || '/',
  plugins: [react()],
  build: {
    // The server bundle is build tooling, not a second published site.
    copyPublicDir: !isSsrBuild,
  },
}))
