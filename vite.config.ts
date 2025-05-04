import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const config: UserConfig = {
  build: {
    target: ["es2015"],
    cssTarget: ["es2015", "safari12"],
    cssMinify: "lightningcss",
    outDir: "./dist",
  },
  base: "./",
  css: {
    transformer: "lightningcss",
    lightningcss: {
      targets: { safari: 12 },
    },
  },
  server: { allowedHosts: ["dare-bot-app.ngrok.app"] },
  plugins: [react()],
};

// https://vite.dev/config/
export default defineConfig(config);
