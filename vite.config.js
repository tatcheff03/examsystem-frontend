import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/student": "http://localhost:8080",
      "/admin": "http://localhost:8080",
      "/examiner": "http://localhost:8080",
      "/tests": "http://localhost:8080",
      "/testpapers": "http://localhost:8080",
      "/responses": "http://localhost:8080",
      "/results": "http://localhost:8080",
    },
  },
});
