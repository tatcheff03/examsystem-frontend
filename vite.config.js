import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    https: false,
    port: 5173,
    host: "localhost", // make sure matches browser URL
    hmr: {
      protocol: "ws",
      host: "localhost", // use 127.0.0.1 if opening via 127.0.0.1
      port: 5173,
    },
    cors: true, // allows cross-origin requests

    proxy: {
      "/student": { target: "http://localhost:8081", changeOrigin: true , secure: false},
      "/admin": { target: "http://localhost:8081", changeOrigin: true, secure: false},
      "/examiner": { target: "http://localhost:8081", changeOrigin: true, secure: false},
      "/tests": { target: "http://localhost:8081", changeOrigin: true, secure: false},
      "/testpapers": { target: "http://localhost:8081", changeOrigin: true, secure: false},
      "/responses": { target: "http://localhost:8081", changeOrigin: true, secure: false},
      "/results": { target: "http://localhost:8081", changeOrigin: true, secure: false},
    },
  },
});
