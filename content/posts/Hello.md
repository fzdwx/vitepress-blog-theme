---
title: "Getting started"
date: 2023-03-23T22:27:31+08:00
draft: false
layout: post
tags: ["hello", "asdasasdas", "bbbbbbbbbbb", "cccccccccc", "ddddddddddddd"]
---

这一个 [VitePress](https://vitepress.vuejs.org/) 的博客主题, 你可以通过以下两种方式使用:

## 1. 直接使用 template

进入项目 [首页](https://github.com/fzdwx/vitepress-blog-theme) 点击 `Use this template`

![image](https://user-images.githubusercontent.com/65269574/227681996-3b540a42-cbbd-45d4-ace8-805bc0d587fd.png)

然后就会生成你自己的仓库:

```shell
git clone https://github.com/yourname/yourrepo.git
cd yourrepo
pnpm i
pnpm dev
```

开始第一篇 posts:

```
cd content/posts
touch Hello.md
```

## 2. 通过引用 npm 包

假设你已经有了一个 VitePress 项目, 那么你可以通过以下方式引用:

```shell
npm i vitepress-blog-theme
```

修改 `.vitepress/config.ts`

```ts
import { ThemeConfig } from "vitepress-blog-theme/src/index";
import { defineConfigWithTheme } from "vitepress";

export default defineConfigWithTheme<ThemeConfig>({
  title: "My Awesome Project",
  description: "A VitePress Site",
  themeConfig: {
    nav: [{ text: "Home", link: "/" }],
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
```

修改 `.vitepress/theme/index.ts`

```ts
import Theme from "vitepress/theme";
import { Layout, attachShortcuts } from "vitepress-blog-theme/src/index";

export default {
  ...Theme,
  Layout,
  //@ts-ignore
  enhanceApp({ app, router, siteData }) {
    attachShortcuts(app);
  },
};
```

## 3.Note:

1. github action 需要开启读写权限
