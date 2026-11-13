import { defineConfig } from "vite";

const base = process.env.VITE_BASE || "/";

export default defineConfig({
  base,
  server: {
    host: "0.0.0.0",
    port: 4182,
    strictPort: true,
    proxy: { "/api": { target: "http://127.0.0.1:8092" } },
  },
  preview: { host: "0.0.0.0", port: 4184, strictPort: true },
});
