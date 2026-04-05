import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Set VITE_BASE_URL in CI (e.g. /repo-name/) for GitHub project pages; use / for a custom domain.
export default defineConfig({
  base: process.env.VITE_BASE_URL || '/',
  plugins: [react()],
})
