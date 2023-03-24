---
title: "Markdown Extension Examples"
date: 2023-03-21T22:27:31+08:00
update: 2023-03-23T22:09:34+0800
draft: false
ShowToc: false
ShowBreadCrumbs: false
layout: post
tags: ["example", "markdown", "jyyos", "project", "pppppp", "o34ui5gklhj"]
---

This page demonstrates some of the built-in markdown extensions provided by VitePress.

## Syntax Highlighting

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

**Input**

````
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## Image

true path is `/public/images/raftp2.png`

```md
![](/images/raftp2.png)
```

![](/images/raftp2.png)

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).
