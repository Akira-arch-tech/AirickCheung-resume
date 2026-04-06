import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** GitHub Pages project URL: https://<user>.github.io/AirickCheung-resume/... */
const GITHUB_BASE = "/AirickCheung-resume/demo-presentation/wechat-ui-demo/";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? GITHUB_BASE : "/",
}));
