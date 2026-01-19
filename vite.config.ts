import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: {
      // 스크린샷 구조상 루트를 가리키고 있으므로 유지하거나 
      // 보통은 path.resolve(__dirname, './') 로 설정합니다.
      '@': path.resolve(__dirname, '.'),
    }
  }
});
