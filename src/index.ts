import Layout from "./Layout.vue";
import "./styles/tailwind.postcss";
import "./styles/reset.css";
import "./styles/var.css";
import "./styles/font.css";
import "./styles/cover.css";
import "./styles/prose.css";
import { attachShortcuts } from "./shortcodes";
import { ThemeConfig } from "./utils/config.type";

export { attachShortcuts, Layout };

export { type ThemeConfig };
