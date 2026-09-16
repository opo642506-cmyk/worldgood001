import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Pretendard",
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "Malgun Gothic",
          "sans-serif",
        ],
        serif: [
          "Noto Serif KR",
          "Apple SD Gothic Neo",
          "serif",
        ],
      },
      colors: {
        ink: {
          50: "#f7f7f5",
          100: "#eceae6",
          200: "#d8d4cc",
          700: "#3d3a34",
          800: "#2a2824",
          900: "#1a1917",
        },
        accent: {
          DEFAULT: "#c45c26",
          soft: "#f3e4da",
        },
      },
      maxWidth: {
        prose: "42rem",
      },
    },
  },
  plugins: [typography],
};

export default config;
