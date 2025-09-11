import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Crimson Text', 'Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fef7f0',
          100: '#feede1',
          200: '#fcdbc3',
          300: '#f9c29f',
          400: '#f5a379',
          500: '#f08654',
          600: '#e8703a',
          700: '#d4572a',
          800: '#b84a27',
          900: '#a14025',
        },
        gold: {
          50: '#fffdf2',
          100: '#fefce8',
          200: '#fef9c3',
          300: '#fef08a',
          400: '#fde047',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
