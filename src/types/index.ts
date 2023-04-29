import {
  ThemeConfig
}
from "./config";

interface Page {
  title: string;
  url: string;
  date: string | number;
  update: string | number; // default is update
  frontmatter: Record<string, any>;
  src: string; // markdown content
  desc: string; // description
  html?: string
}

interface Links {
  name?: string;
  url: string;
  icon?: string;
  desc?: string;
}

interface FeedItem {
  name: string;
  avatar: string;
  info: FeedItemInfo[];
}

interface FeedItemInfo {
  name: string;
  title: string;
  url: string;
  time: string;
}

export type {
  Page, ThemeConfig, Links, FeedItem, FeedItemInfo
};
