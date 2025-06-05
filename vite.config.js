// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // For username.github.io, use just a forward slash
  plugins: [react()],
});
