import { defineConfig } from 'vite';
// esModuleInterop 꺼져있을 때는 이렇게!
import * as react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react.default()],
});