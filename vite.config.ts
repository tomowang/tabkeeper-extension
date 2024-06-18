import { resolve } from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./public/manifest.json";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // for further extension, e.g. `popup.html`
        index: resolve(__dirname, "index.html"),
      },
    },
  },
  plugins: [tsconfigPaths(), react(), crx({ manifest })],
});
