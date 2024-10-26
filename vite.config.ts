import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";

export default defineConfig({
  plugins: [deno()],
  build: {
    outDir: "dist", // For production builds
  },
});
