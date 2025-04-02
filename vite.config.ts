import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./", // ✅ Fix for Vercel routing
  build: {
    outDir: "dist", // ✅ Ensures output in "dist"
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
});
