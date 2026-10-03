import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // Step A: Catch any requests starting with /api-upload
      "/api-upload": {
        target: "https://freeimage.host", // Step B: Target host
        changeOrigin: true, // Step C: Virtual hosted site fix
        // Step D: Rewrite /api-upload to match the final API path
        rewrite: (path) =>
          path.replace(/^\/api-upload/, "/api-1-upload-fallback"),
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {
            // Force the API to see the correct expected endpoint path
            proxyReq.path = "/api/1/upload";
          });
        },
      },
    },
  },
});
