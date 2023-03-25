---
title: "Layout"
date: 2023-03-23T22:25:31+08:00
draft: false
layout: post
tags: ["intro"]
---

当前支持的 Layout 有 `post`, `issue`, `doc`, 用来应对各种不同的场景.

```md
---
title: "Getting started"
date: 2023-03-23T22:27:31+08:00
draft: false
layout: post # post, issue, doc
tags: ["intro"]
---
```

## 1. post

这个 layout 就是正常博客了, 不会有大纲以及侧边栏.

## 2. issue

通过 Github action 自动同步 issue 到博客, 可以动态的更新内容(不用在本地编辑).

## 3. doc

这个 layout 会有大纲以及侧边栏, 用来写文档, 或者做一些笔记.

而且它有些特殊的 `frontmatter` 字段:

1. `group` 用来分组, 会在侧边栏显示, 默认是 `Others`. 比如说我有一系列关于 `Rust` 的笔记, 你就可以设置为 `group = Rust 语言笔记`

示例: [os1](/content/docs/os/os-1.html)
