import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig(({ mode }) => {
  const defaultConfig = {
    plugins: [react(), svgr()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };

  if (mode === "lib") {
    return {
      ...defaultConfig,
      build: {
        lib: {
          entry: path.resolve(__dirname, "src/index.js"),
          name: "ReplayPlayer",
          fileName: "replay-player",
          formats: ["es"],
        },
        rollupOptions: {
          external: ["react", "react-dom"],
          output: {
            assetFileNames: "[name][extname]",
          },
        },
      },
    };
  }

  return defaultConfig;
});
