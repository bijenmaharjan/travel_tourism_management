// vite.config.js
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      leaflet: path.resolve(__dirname, "node_modules/leaflet"),
    },
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
});
