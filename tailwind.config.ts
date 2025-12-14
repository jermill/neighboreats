import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light mode colors
        background: '#ffffff',
        foreground: '#0f1419',
        
        // Dark mode colors
        'dark-bg': '#1a1410',
        'dark-bg-secondary': '#2a2018',
        'dark-text': '#f8f9fa',
        
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          light: '#208080', // Light mode teal
          dark: '#1a9b96',  // Dark mode teal
        },
        customer: {
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
        },
        chef: {
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        driver: {
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        accent: {
          light: '#ff6b35',  // Light mode orange
          dark: '#ff8c42',   // Dark mode orange
        },
      },
      // Mobile-optimized spacing
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
    },
  },
  plugins: [],
};
export default config;




