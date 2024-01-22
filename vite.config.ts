import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  build: {
    outDir: "build",
  },
  server: {
    host: true,
  },
  plugins: [react()],
});
