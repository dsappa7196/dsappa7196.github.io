import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/dsappa7196.github.io/', // <-- this is important!
  plugins: [react()],
});
