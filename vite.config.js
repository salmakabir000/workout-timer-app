import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/jest.setup.js',
    include: ['src/**/*.test.{js,ts,jsx,tsx}'], 
    exclude: ['e2e/**', 'node_modules/**'] // ✅ Exclude Playwright tests
  },
})
