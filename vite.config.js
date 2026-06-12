import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" makes the build work both at the repo's project path
// (rodolfo17293.github.io/ecobus/) and at the custom domain root.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
