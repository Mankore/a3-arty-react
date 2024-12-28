import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  base: "/a3-arty-react/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});