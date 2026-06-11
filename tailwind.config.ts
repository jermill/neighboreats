import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors - https://coolors.co/282119-8c3030-f8f9fa-026181-ff8c42
        'brand-dark': '#282119',      // Deep charcoal brown
        'brand-burgundy': '#8C3030',  // Rich burgundy
        'brand-light': '#F8F9FA',
        'brand-cream': '#FAF7F2',  // Warm page background (Daylight theme)     // Soft white
        'brand-teal': '#026181',      // Deep teal
        'brand-coral': '#FF8C42',     // Vibrant coral
        
        // Light mode colors
        background: '#ffffff',
        foreground: '#0f1419',
        
        primary: {
          50: '#e6f3f7',
          100: '#cce7ef',
          200: '#99cfe0',
          300: '#66b7d0',
          400: '#339fc1',
          500: '#026181',    // Brand teal
          600: '#024e67',
          700: '#013a4d',
          800: '#012734',
          900: '#01131a',
          light: '#026181',
          dark: '#339fc1',
        },
        customer: {
          500: '#8C3030',    // Brand burgundy
          600: '#702626',
          700: '#541d1d',
        },
        chef: {
          500: '#FF8C42',    // Brand coral
          600: '#cc7035',
          700: '#995428',
        },
        driver: {
          500: '#059669',    // Emerald green
          600: '#047857',
          700: '#065f46',
        },
        accent: {
          light: '#FF8C42',  // Brand coral
          dark: '#ff8c42',
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




