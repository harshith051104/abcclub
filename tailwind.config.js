/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E40AF', // Blue-800
          hover: '#1E3A8A', // Blue-900
        },
        accent: {
          DEFAULT: '#F59E0B', // Amber-500
          hover: '#D97706', // Amber-600
        },
      },
    },
  },
  plugins: [],
};