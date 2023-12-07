import { defineConfig } from 'vite'
import path from "path";
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "dexie": path.resolve(__dirname, "./node_modules/dexie/dist/dexie.d.ts")
    },
  },
  plugins: [react()],
})
