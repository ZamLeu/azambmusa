/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        retro: {
          bg: '#F4F4F2',
          outer: '#E5E5E2',
          black: '#0D0D0D',
          border: '#0D0D0D',
          muted: '#666663',
          line: '#D1D1CE',
        }
      },
      fontFamily: {
        pixel: ['"Silkscreen"', '"Press Start 2P"', 'monospace'],
        mono: ['"Space Mono"', '"Courier Prime"', 'monospace'],
      },
      animation: {
        'float-slow': 'floatSlow 4s ease-in-out infinite',
        'blink': 'blink 1s step-start infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
