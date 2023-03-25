import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import vueJsx from "@vitejs/plugin-vue-jsx";

import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@/": `${resolve(__dirname, "src")}/`,
    },
  },
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
  plugins: [
    vueJsx({}),
    Icons(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ["vue", "vue/macros", "@vueuse/core"],
      dts: true,
      dirs: [
        "./.vitepress/theme/components",
        "./.vitepress/theme/shortcuts",
        "./.vitepress/theme/utils",
        "./src/components",
        "./src/shortcuts",
        "./src/utils",
      ],
      vueTemplate: true,
      eslintrc: {
        enabled: true,
      },
    }),
    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
      dirs: [
        "./.vitepress/theme/components",
        "./.vitepress/theme/shortcuts",
        "./src/components",
        "./src/shortcuts",
      ],
      resolvers: [IconsResolver()],
    }),
  ],
});
