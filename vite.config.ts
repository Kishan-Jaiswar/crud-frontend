import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // ✅ Fix for Vercel routing
  build: {
    outDir: "dist", // ✅ Ensures output in "dist"
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
});