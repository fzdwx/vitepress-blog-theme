// https://vitepress.dev/guide/custom-theme
import Theme from "vitepress/theme";
import { Layout, attachShortcuts } from "@/index";

export default {
  ...Theme,
  // Layout: () => {
  //   return h(Theme.Layout, null, {
  //     // https://vitepress.dev/guide/extending-default-theme#layout-slots
  //   })
  // },
  Layout,
  //@ts-ignore
  enhanceApp({ app, router, siteData }) {
    attachShortcuts(app);
  },
};
