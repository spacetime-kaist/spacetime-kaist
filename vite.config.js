import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");

  // Build target can be selected via mode or env var:
  // - preview: deployed under /spacetime-preview/
  // - default: deployed at site root
  const deployTarget = env.DEPLOY_TARGET || env.VITE_DEPLOY_TARGET || mode;

  const base = deployTarget === "preview" ? "/spacetime-preview/" : "/";

  return {
    plugins: [react(), tailwindcss()],
    base,
    build: {
      outDir: "dist",
    },
  };
});

