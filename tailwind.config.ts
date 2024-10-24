import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'chinese-red': '#DE2910',
        'chinese-gold': '#FFD700',
      },
      fontFamily: {
        'noto-sans-sc': ['var(--font-noto-sans-sc)'],
      },
    },
  },
  plugins: [],
};

export default config;
