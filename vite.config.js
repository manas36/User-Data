import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" uses relative paths, so the build works on GitHub Pages
// under any repository name (https://USERNAME.github.io/REPO-NAME/).
export default defineConfig({
  plugins: [react()],
  base: "./",
});
