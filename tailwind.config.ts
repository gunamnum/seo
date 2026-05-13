import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        ink: "#000000",
        body: "#000000",
        "body-strong": "#000000",
        canvas: "#ffffff",
        "inverse-canvas": "#000000",
        "inverse-ink": "#ffffff",
        mist: "#f7f7f5",
        paper: "#ffffff",
        line: "#e6e6e6",
        hairline: "#e6e6e6",
        "hairline-soft": "#f1f1f1",
        muted: "#000000",
        "muted-soft": "#666666",
        "brand-blue": "#000000",
        cta: "#000000",
        "cta-hover": "#222222",
        "on-primary": "#ffffff",
        "surface-card": "#ffffff",
        "surface-soft": "#f7f7f5",
        "block-lime": "#dceeb1",
        "block-lilac": "#c5b0f4",
        "block-cream": "#f4ecd6",
        "block-pink": "#efd4d4",
        "block-mint": "#c8e6cd",
        "block-coral": "#f3c9b6",
        "block-navy": "#1f1d3d",
        "accent-magenta": "#ff3d8b",
        "semantic-success": "#1ea64a",
        berry: "#dceeb1",
        coral: "#f3c9b6",
        aqua: "#c8e6cd",
        mint: "#c8e6cd",
        sun: "#f4ecd6",
        violet: "#c5b0f4",
        blueprint: "#1f1d3d"
      },
      fontFamily: {
        sans: ["Inter", "Geist", "SF Pro Display", "system-ui", "Arial", "sans-serif"],
        display: ["Inter", "Geist", "SF Pro Display", "system-ui", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "Geist Mono", "SF Mono", "Consolas", "monospace"]
      },
      boxShadow: {
        soft: "0 0 0 1px #e6e6e6",
        lift: "0 4px 16px rgba(0, 0, 0, 0.06)",
        "brand-glow": "0 0 0 1px #000000"
      }
    }
  },
  plugins: []
};

export default config;
