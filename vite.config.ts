import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    // 本环境无回收站，安全删除机制 fail-closed 会拦住 Vite 清空 dist，
    // 故关闭自动清空，仅写入覆盖（同名文件覆盖，旧无关文件残留无害）。
    emptyOutDir: false,
  },
})
