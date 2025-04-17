import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
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
  theme: {
    extend: {
      animation: {
        bounce: "bounce 0.5s ease-in-out infinite", // Custom bounce animation
        "fade-in": "fadeIn 0.5s ease-in-out", // Fade-in animation
        "fade-in-delay": "fadeIn 0.5s ease-in-out 0.5s", // Fade-in with delay
        "fade-in-delay-2": "fadeIn 0.5s ease-in-out 1s", // Fade-in with 2nd delay
        "fade-in-delay-3": "fadeIn 0.5s ease-in-out 1.5s", // Fade-in with 3rd delay
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
});
