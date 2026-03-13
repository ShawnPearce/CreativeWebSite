/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'Apple Color Emoji',
          'Segoe UI Emoji',
        ],
        serif: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      colors: {
        ink: {
          50: '#F7F7FA',
          100: '#EFEFF6',
          200: '#D9D9E8',
          300: '#B8B8D3',
          400: '#8D8DB5',
          500: '#64648F',
          600: '#4B4B72',
          700: '#353557',
          800: '#24243C',
          900: '#151525',
          950: '#0B0B14',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.08), 0 20px 80px rgba(0,0,0,0.55)',
      },
    },
  },
  plugins: [],
}

