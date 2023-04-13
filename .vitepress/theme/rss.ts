import { createContentLoader, type SiteConfig } from "vitepress";
import { Author, Feed } from "feed";
import path from "path";
import { resolve } from "path";
import { writeFileSync, createWriteStream } from "fs";

import { SitemapStream } from "sitemap";

export const getRssFeed = ({
  baseUrl,
  links,
  copyright,
  author,
}: {
  baseUrl: string;
  copyright: string;
  links: any;
  author?: Author;
}) => {
  return async (config: SiteConfig) => {
    const posts = await createContentLoader("./content/**/*.md", {
      excerpt: true,
      render: true,
    }).load();

    posts.sort(
      (a, b) =>
        +new Date(b.frontmatter.date as string) -
        +new Date(a.frontmatter.date as string)
    );

    rss(config, baseUrl, copyright, posts, author);

    await sitemap(baseUrl, config, links);
  };
};

async function sitemap(baseUrl: string, config: SiteConfig<any>, links: any) {
  const sitemap = new SitemapStream({ hostname: baseUrl });
  const writeStream = createWriteStream(resolve(config.outDir, "sitemap.xml"));
  sitemap.pipe(writeStream);
  links.forEach((link: any) => sitemap.write(link));
  sitemap.end();
  await new Promise((r) => writeStream.on("finish", r));
}

function rss(
  config: SiteConfig<any>,
  baseUrl: string,
  copyright: string,
  posts: any[],
  author?: Author
) {
  const feed = new Feed({
    title: config.site.title,
    description: config.site.description,
    language: config.site.lang,
    id: baseUrl,
    link: baseUrl,
    image: `${baseUrl}/favicon.ico`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: copyright,
    author: author,
  });
  posts = posts.slice(0, 5);
  for (const { url, excerpt, frontmatter, html } of posts) {
    feed.addItem({
      title: frontmatter.title,
      id: `${baseUrl}${url}`,
      link: `${baseUrl}${url}`,
      description: excerpt,
      content: html,
      author: [
        {
          name: frontmatter.author,
          link: frontmatter.twitter
            ? `https://twitter.com/${frontmatter.twitter}`
            : undefined,
        },
      ],
      date: frontmatter.date ? new Date(frontmatter.date) : new Date(),
    });
  }

  writeFileSync(path.join(config.outDir, "rss.xml"), feed.rss2());
}
