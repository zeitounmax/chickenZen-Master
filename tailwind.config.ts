// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'chinese': {
          red: '#DE2910',
          gold: '#FFDE00'
        },
        'jade': '#00A86B',
        'imperial': '#602F6B',
      },
    },
  },
  safelist: [
    'bg-chinese-red',
    'bg-chinese-gold',
    'text-chinese-red',
    'text-chinese-gold',
    'hover:text-chinese-red',
    'hover:text-chinese-gold',
  ],
  plugins: [],
}