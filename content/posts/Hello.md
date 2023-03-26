---
title: "Getting started"
date: 2023-03-23T22:27:31+08:00
layout: post
tags: ["intro"]
cover:
  image: https://user-images.githubusercontent.com/65269574/227759806-0ac36549-9ada-426b-8c67-50c0ae04b3d9.png
  position: left
---

## 1. 安装主题

在 https://github.com/fzdwx/vitepress-blog-theme/releases 页面下载操作系统对应的 bang 压缩文件.

> bang 是 vitepress-blog-theme 的命令行工具, 用于快速创建博客, 更新主题等

然后运行 `bang init`

就会在当前目录下生成一个 `vitepress-blog-theme` 的文件夹, 这个其实也是通过 `git clone` 实现的, 只是删除了一些不必要的文件

```shell
# 运行项目
cd vitepress-blog-theme
pnpm i
pnpm dev
```

接下来可以运行 `bang new` 来创建一篇文章,

```shell
bang new # 交互式创建文章
bang new -t "文章标题" # 直接创建文章
bang -t "标题" -l "post" -g "group" new # -l 支持 post, doc, -g 只在 doc 下使用
```

所有的文章都在 `content/` 文件夹下

如果后续需要更新主题, 可以使用 `bang update` 命令

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
