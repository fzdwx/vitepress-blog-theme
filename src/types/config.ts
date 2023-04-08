import { DocSearchProps } from "vitepress/types/docsearch";

export interface ThemeConfig {
  /**
   * The global date format pattern.
   * default is 'YYYY-MM-DD HH:mm:ss'
   */
  dateFormat?: string;

  /**
   * The logo file of the site.
   *
   * @example '/logo.svg'
   */
  icon?: ThemeableImage;

  /**
   * pages sorted by date or update
   * default is 'date'
   */
  sortBy?: "date" | "update";

  /**
   * Custom site title in navbar. If the value is undefined,
   * `config.title` will be used.
   */
  siteTitle?: string | false;

  /**
   * Custom header levels of outline in the aside component.
   *
   * @default 2
   */
  outline?: Outline | Outline["level"] | false;

  /**
   * @deprecated
   * Use `outline.label` instead.
   *
   * @default 'On this page'
   */
  outlineTitle?: string;

  /**
   * The nav items.
   */
  nav?: NavItem[];

  /**
   * Set to `false` to prevent rendering of aside container.
   *
   * @default true
   */
  aside?: boolean;

  /**
   * Info for the edit link. If it's undefined, the edit link feature will
   * be disabled.
   */
  editLink?: EditLink;

  /**
   * Set custom last updated text.
   *
   * @default 'Last updated'
   */
  lastUpdatedText?: string;

  /**
   * The social links to be displayed at the end of the nav bar. Perfect for
   * placing links to social services such as GitHub, Twitter, Facebook, etc.
   */
  socialLinks?: SocialLink[];

  /**
   * The footer configuration.
   */
  footer?: Footer;

  /**
   * @default 'Appearance'
   */
  darkModeSwitchLabel?: string;

  /**
   * @default 'Menu'
   */
  sidebarMenuLabel?: string;

  /**
   * @default 'Return to top'
   */
  returnToTopLabel?: string;

  /**
   * Set custom `aria-label` for language menu button.
   *
   * @default 'Change language'
   */
  langMenuLabel?: string;

  /**
   * The algolia options. Leave it undefined to disable the search feature.
   */
  algolia?: AlgoliaSearchOptions;

  /**
   * The carbon ads options. Leave it undefined to disable the ads feature.
   */
  carbonAds?: CarbonAdsOptions;

  /**
   * Changing locale when current url is `/foo` will redirect to `/locale/foo`.
   *
   * @default true
   */
  i18nRouting?: boolean;
}

// algolia -------------------------------------------------------------------

/**
 * The Algolia search options. Partially copied from
 * `@docsearch/react/dist/esm/DocSearch.d.ts`
 */
export interface AlgoliaSearchOptions extends DocSearchProps {
  locales?: Record<string, Partial<DocSearchProps>>;
}

// carbon ads ----------------------------------------------------------------

export interface CarbonAdsOptions {
  code: string;
  placement: string;
}

// social link ---------------------------------------------------------------

export interface SocialLink {
  icon: SocialLinkIcon;
  link: string;
}

export type SocialLinkIcon =
  | "discord"
  | "facebook"
  | "github"
  | "instagram"
  | "linkedin"
  | "mastodon"
  | "slack"
  | "twitter"
  | "youtube"
  | { svg: string };

// footer --------------------------------------------------------------------

export interface Footer {
  message?: string;
  copyright?: string;
}

// outline -------------------------------------------------------------------

export interface Outline {
  level?: number | [number, number] | "deep";
  label?: string;
}

// nav -----------------------------------------------------------------------

export type NavItem = NavItemWithLink | NavItemWithChildren;

export interface NavItemWithLink {
  text: string;
  link: string;

  /**
   * `activeMatch` is expected to be a regex string. We can't use actual
   * RegExp object here because it isn't serializable
   */
  activeMatch?: string;
  target?: string;
  rel?: string;
}

export interface NavItemChildren {
  text?: string;
  items: NavItemWithLink[];
}

export interface NavItemWithChildren {
  text?: string;
  items: (NavItemChildren | NavItemWithLink)[];

  /**
   * `activeMatch` is expected to be a regex string. We can't use actual
   * RegExp object here because it isn't serializable
   */
  activeMatch?: string;
}

// image ---------------------------------------------------------------------

export type ThemeableImage =
  | string
  | { src: string; alt?: string }
  | { light: string; dark: string; alt?: string };

// edit link -----------------------------------------------------------------

export interface EditLink {
  /**
   * Pattern for edit link.
   *
   * @example 'https://github.com/vuejs/vitepress/edit/main/docs/:path'
   */
  pattern: string | ((payload: { relativePath: string }) => string);

  /**
   * Custom text for edit link.
   *
   * @default 'Edit this page'
   */
  text?: string;
}
