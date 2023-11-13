import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: "../server/public",
  server: {
    proxy: {
      "/server/": "http://localhost:8888/",
    },
  },
});