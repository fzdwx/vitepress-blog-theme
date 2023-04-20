import { DefaultTheme } from "vitepress";

export interface ThemeConfig extends DefaultTheme.Config {
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
  icon?: DefaultTheme.ThemeableImage;

  /**
   * pages sorted by date or update
   * default is 'date'
   */
  sortBy?: "date" | "update";

  issues?: {
    showComment?: boolean; // default false
  };
}
