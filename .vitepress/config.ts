import { ThemeConfig } from "@/index";
import { defineConfigWithTheme } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<ThemeConfig>({
  title: "fzdwx",
  description: "What your say ?",
  themeConfig: {
    sortBy: "date",
    icon: "https://raw.githubusercontent.com/fzdwx/blog-history/main/static/images/party_parrot.gif",
    dateFormat: "YYYY-MM-DD HH:mm:ss",
    editLink: {
      text: "✍",
      pattern: (path) => {
        return `https://github.com/fzdwx/vitepress-blog-theme/blob/main/${path}`;
      },
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "Notes",
        link: "/tags?layout=issue",
      },
      {
        text: "Docs",
        link: "/tags?layout=doc",
      },
      { text: "Tags", link: "/tags?layout=post", activeMatch: "" },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/fzdwx/vitepress-blog-theme" },
    ],
  },
});
