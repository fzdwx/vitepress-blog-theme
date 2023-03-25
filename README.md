# vitepress blog theme

一个 VitePress 的博客主题, live demo: https://vitepress-blog-theme.vercel.app/

<a href="https://vitepress-blog-theme.vercel.app/content/posts/Hello.html"><img src="https://user-images.githubusercontent.com/65269574/227685679-403ce024-d33b-4ac8-9e7c-db673aff5281.png"></a>

## Features

1. Dark mode
2. 支持多种 Layout
   - post: 一般日常的文章, 存放于 `content/posts` 目录下
   - issue: 可以当作一种动态的文章来使用, 即不用在本地修改, 直接在页面上编辑, 通过 [github action](https://github.com/fzdwx/vitepress-blog-theme/blob/main/.github/workflows/update.yml) 进行同步, 存放于 `content/issues` 目录下
3. 支持 tag 页面

## Local development

使用 `pnpm` 作为包管理器, 你可以通过以下方式进行本地开发

```shell
pnpm i
pnpm dev
```

如果需要测试同步 issue 功能,你需要 `go` 环境,并运行

```
export token=your_github_token
export repo=your_repo
pnpm sync
```

## License

MIT License
