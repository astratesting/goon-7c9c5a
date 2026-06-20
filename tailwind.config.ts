import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0F",
        surface: "#12121A",
        indigo: "#6366F1",
        purple: "#A855F7",
        cyan: "#00E5FF",
        muted: "#8B8BA7",
        "surface-light": "#1A1A25",
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
