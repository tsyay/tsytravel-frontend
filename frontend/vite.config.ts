import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: '/',
  plugins: [react(), tsconfigPaths()],
  build: {
    assetsInlineLimit: 4096,
  },
  server: {
    headers: {
      "Cache-Control": "public, max-age=31536000",
    },
  },
});
