import { defineConfig } from "vite";
import { miaodaDevPlugin } from "miaoda-sc-plugin";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // GitHub Pages 部署时，base 设置为仓库名
  // 本地开发时 base 为 '/'
  const base = mode === 'production' ? '/personal_page/' : '/';

  return {
    base,
    plugins: [
      react(),
      miaodaDevPlugin(),
      svgr({
        svgrOptions: {
          icon: true,
          exportType: "named",
          namedExport: "ReactComponent",
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
  };
});
