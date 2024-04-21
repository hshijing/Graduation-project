import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
export default defineConfig({
  plugins: [uni()],
  server: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  /* build: {
    outDir: "./build",
    assetsDir: "static",
    rollupOptions: {
      output: {
        dir: "./build",
        entryFileNames: "[hash:8]_[name].js",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "js/vendor";
          }
          return "js/[hash:8][name].js";
        },
        chunkFileNames: "js/[hash:8]_[name].js",
        assetFileNames(file) {
          if (file.name?.endsWith("css")) {
            return "static/css/[name].[hash:8].css";
          }
          if (
            file.name?.endsWith("jpg") ||
            file.name.endsWith("png") ||
            file.name.endsWith("jpeg") ||
            file.name.endsWith("svg") ||
            file.name.endsWith("gif") ||
            file.name.endsWith("webp")
          ) {
            return "static/image/[name].[hash:8].[ext]";
          }
          return "static/[name].[hash:8].[ext]";
        },
      },
    },
  }, */
});
