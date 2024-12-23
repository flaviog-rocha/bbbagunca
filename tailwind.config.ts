import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mainThemePrimary: "#572b3a",
        mainThemeDarker: "#360414",
        mainThemeLighter: "#cc9bab",
        mainThemeFullLighter: "#e3c3cd",
        purpleThemePrimary: "#c9c5d4",
        purpleThemeLighter: "#e2dcf2",
        purpleThemeSecondary: "#908c9c",
        purpleThemeTertiary: "#8c869c",
      },
      width: {
        '240': '60rem'
      }
    },
  },
  plugins: [],
} satisfies Config;
