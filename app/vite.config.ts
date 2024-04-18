import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  cacheDir: "../node_modules/.vite",
  server: {
    host: "0.0.0.0",
    port: 3000
  },
});
