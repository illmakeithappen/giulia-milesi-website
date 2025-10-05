import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
        cyan: colors.cyan,
        rose: colors.rose,
      },
      fontFamily: {
        'allura': ['var(--font-allura)', 'cursive'],
        'alex-brush': ['var(--font-alex-brush)', 'cursive'],
        'satisfy': ['var(--font-satisfy)', 'cursive'],
        'kaushan': ['var(--font-kaushan)', 'cursive'],
        'cormorant': ['var(--font-cormorant)', 'serif'],
        'alvara-sans': ['var(--font-alvara-sans)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 2s ease-in-out',
        'slide-up': 'slideUp 1.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
