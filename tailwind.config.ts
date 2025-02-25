import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      gridTemplateColumns: {
        "8-cols": "repeat(8, minmax(20px, 1fr))",
      },
      fontFamily: {
        hennypenny: ["var(--henny-penny)"],
        inter: ["var(--font-inter)"],
      },
      colors: {
        app: {
          primary: "#5F0000",
          secondary: "#EB963F",
          tertiary: "#3C2003",
          btn: "#4A3928",
          coffee: "#997E63",
        },
        background: "hsl(var(--background))",
        neutral: {
          DEFAULT: "hsla(0, 0%, 25%, 1)",
        },
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsla(220, 23%, 97%, 1)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsla(0, 100%, 19%, 1)",
          foreground: "hsla(0, 22%, 92%, 1)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsla(32, 81%, 96%, 1)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsla(240, 5%, 65%, 1)",
        input: "hsla(30, 81%, 58%, 1)",
        ring: "hsla(0, 0%, 90%, 1)",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      boxShadow: {
        customOne: "0px 4px 4px -4px rgba(12, 12, 13, 0.05)",
        customTwo: "0px 16px 32px -10px rgba(12, 12, 13, 0.1)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
};
export default config;
