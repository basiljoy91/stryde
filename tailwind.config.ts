import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./styles/**/*.{css}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        foreground: "#F5F5F0",
        brand: {
          black: "#0A0A0A",
          white: "#F5F5F0",
          accent: "#E8FF47",
          mid: "#1C1C1C",
          muted: "#6B6B6B",
          ember: "#FF5336",
          copper: "#8A3D16",
        },
        "brand-black": "#0A0A0A",
        "brand-white": "#F5F5F0",
        "brand-accent": "#E8FF47",
        "brand-mid": "#1C1C1C",
        "brand-muted": "#6B6B6B",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "sans-serif"],
        display: ["var(--font-bebas-neue)", "sans-serif"],
        mono: ["var(--font-space-grotesk)", "monospace"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        section: "clamp(6rem, 8vw, 9rem)",
      },
      borderRadius: {
        sm: "0.875rem",
        md: "1.125rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "2.75rem",
        "3xl": "3.5rem",
        pill: "999px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(232,255,71,0.18), 0 24px 60px rgba(232,255,71,0.14)",
        "glow-soft":
          "0 0 0 1px rgba(232,255,71,0.12), 0 14px 36px rgba(232,255,71,0.1)",
        panel: "0 28px 80px rgba(0, 0, 0, 0.35)",
      },
      letterSpacing: {
        display: "0.08em",
        wide: "0.24em",
      },
      maxWidth: {
        shell: "1440px",
      },
      backgroundImage: {
        "mesh-glow":
          "radial-gradient(circle at top right, rgba(232,255,71,0.08), transparent 24%), radial-gradient(circle at left center, rgba(255,83,54,0.12), transparent 30%), linear-gradient(135deg, rgba(255,255,255,0.04), transparent 42%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseLine: {
          "0%, 100%": { opacity: "0.3", transform: "scaleX(0.96)" },
          "50%": { opacity: "1", transform: "scaleX(1)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-line": "pulseLine 4.5s ease-in-out infinite",
      },
    },
  },
};

export default config;
