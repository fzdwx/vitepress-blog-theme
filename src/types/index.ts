import { ThemeConfig } from "./config";

interface Page {
  title: string;
  url: string;
  date: string | number;
  update: string | number; // default is update
  frontmatter: Record<string, any>;
  src: string; // markdown content
  desc: string; // description
}

interface Links {
  name?: string;
  url: string;
  icon?: string;
  desc?: string;
}

export type { Page, ThemeConfig, Links };
