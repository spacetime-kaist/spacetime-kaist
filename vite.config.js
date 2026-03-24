import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(() => {
  const isNetlify = !!process.env.NETLIFY;
  return {
    plugins: [react(), tailwindcss()],
    base: isNetlify ? '/' : './',
    build: {
      outDir: 'dist',
    },
  };
})

