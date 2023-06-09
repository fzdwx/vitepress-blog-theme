/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./.vitepress/**/*.{js,ts,tsx,vue}",
    "./content/**/*.md",
    "./src/**/*.{js,ts,vue,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-headings": "#3c3c43",
            "--tw-prose-code": "#3c3c43",
            "--tw-prose-invert-headings": "#fffff5db",
            "--tw-prose-invert-code": "#fffff5db",
            "--tw-prose-invert-body": "#fffff5db",
            "--tw-prose-invert-bold": "#fffff5db",
          },
        },
      },
      animation: {
        text: "text 5s ease infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
      colors: {
        "dark-text": "#fffff5db",
        "dark-red": "#d5a6bd",
        "blue-1": "#a175ff",
        "blue-2": "#a394f0",
        "cyna-1": "#61ffca",
        "cyna-2": "#73bc83",
        "cyna-3": "#57bf7d",
        color1: "#bfbfbf",
        color2: "#d5a6bd",
        color3: "#a3c7e6",
        color4: "#9fd4b9",
        color5: "#808080",
        color6: "#404040",
        color7: "#f6eaa2",
        color8: "#ff8c00",
        color9: "#ff8ba6",
        color10: "#d4a373",
        pink1: "#ffe9f3",
        pink2: "#f2ccff",
        pink3: "#f5e1ff",
        pink4: "#e7f5f0",
        pink5: "#f1faf5",
        darkbg: "#1c1c1c",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
