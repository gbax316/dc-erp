import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A1D56',
          50: '#E6EBF5',
          100: '#C5D1E8',
          200: '#8EA1D0',
          300: '#5C79BB',
          400: '#3A5CA6',
          500: '#0A1D56', // Main primary color
          600: '#091A4D',
          700: '#071644',
          800: '#06133B',
          900: '#040E2D',
        },
        accent: {
          DEFAULT: '#4A90E2',
          50: '#ECF4FC',
          100: '#D9E9F9',
          200: '#B3D3F3',
          300: '#8CBDEC',
          400: '#66A7E6',
          500: '#4A90E2', // Main accent color
          600: '#2179DC',
          700: '#1A62B3',
          800: '#154D8C',
          900: '#0F3865',
        },
        background: {
          DEFAULT: '#F9FAFC',
          paper: '#FFFFFF',
          subtle: '#F1F5F9',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['var(--font-merriweather)'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft-xs': '0 1px 3px rgba(0, 0, 0, 0.05)',
        'soft-sm': '0 2px 4px rgba(0, 0, 0, 0.05)',
        'soft': '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
        'soft-md': '0 6px 10px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.1)',
        'soft-lg': '0 10px 15px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'soft-xl': '0 15px 25px rgba(0, 0, 0, 0.05), 0 6px 10px rgba(0, 0, 0, 0.05)',
        'soft-2xl': '0 25px 50px rgba(0, 0, 0, 0.05), 0 8px 15px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config; 