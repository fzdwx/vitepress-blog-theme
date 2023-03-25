---
title: "Getting started"
date: 2023-03-23T22:27:31+08:00
draft: false
layout: post
tags: ["hello", "asdasasdas", "bbbbbbbbbbb", "cccccccccc", "ddddddddddddd"]
---

这一个 [VitePress](https://vitepress.vuejs.org/) 的博客主题, 目前仅支持通过 template 的方式使用:

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

## 2. 部署

可以通过 `Github action` 自动部署到 `Github Pages` 上, 也可以使用 `Vercel`.

### 2.1 Github action

如果使用 `Github action` 部署, 仅需将 `deploy.yml.example` 重命名为 `deploy.yml` 即可

![image](https://user-images.githubusercontent.com/65269574/227693247-cd247b3c-bf2d-4ceb-8f8a-9df58c8a4150.png)

### 2.2 Vercel

需要修改构建命令为:

![image](https://user-images.githubusercontent.com/65269574/227693554-f851cf22-dd51-48db-9fd5-d81446227862.png)

更多配置请参考 https://vitepress.dev/guide/deploy#netlify-vercel-cloudflare-pages-aws-amplify-render

## 3. Note

1. 设置 Github token 到 `Github action` 中
   ![image](https://user-images.githubusercontent.com/65269574/227569403-ac21c7fa-ed22-45e2-824d-1fa293ce0ac7.png)
2. 修改 `repo` 为你当前仓库的名称
   ![image](https://user-images.githubusercontent.com/65269574/227692648-79b74a2e-b597-40a3-a7c0-6acc85a75d5a.png)
3. Github action 需要开启读写权限 `Read and write permissions`
   ![image](https://user-images.githubusercontent.com/65269574/227569746-8e615cca-69f4-488c-a1a9-5849eb40327f.png)
