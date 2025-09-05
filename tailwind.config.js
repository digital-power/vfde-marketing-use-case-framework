/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2', 
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#bd3333', // Main brand color RGB(189,51,51)
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#bd3333', // Main brand color RGB(189,51,51)
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        }
      },
      fontFamily: {
        sans: ['Sansation', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        }
      },
      boxShadow: {
        'red': '0 4px 12px rgba(189, 51, 51, 0.1)',
        'red-lg': '0 6px 20px rgba(189, 51, 51, 0.15)',
        'red-button': '0 4px 12px rgba(189, 51, 51, 0.3)',
      }
    },
  },
  plugins: [],
}