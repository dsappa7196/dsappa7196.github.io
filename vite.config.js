// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // For user site (Padmasree_Sappa.github.io)
  plugins: [react()],
});


