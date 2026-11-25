/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        edu: {
          brand: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            500: '#0284c7',
            600: '#0369a1',
            700: '#075985',
          },
          math: {
            light: '#eff6ff',
            DEFAULT: '#3b82f6',
            dark: '#1d4ed8',
            accent: '#60a5fa'
          },
          language: {
            light: '#ecfdf5',
            DEFAULT: '#10b981',
            dark: '#047857',
            accent: '#34d399'
          },
          geography: {
            light: '#fffbeb',
            DEFAULT: '#f59e0b',
            dark: '#b45309',
            accent: '#fbbf24'
          },
          english: {
            light: '#faf5ff',
            DEFAULT: '#8b5cf6',
            dark: '#6d28d9',
            accent: '#a78bfa'
          },
          star: '#fbbf24',
          streak: '#f97316'
        }
      },
      fontFamily: {
        sans: ['"Nunito"', '"Quicksand"', 'system-ui', 'sans-serif'],
        rounded: ['"Quicksand"', '"Nunito"', 'sans-serif'],
      },
      minHeight: {
        'touch': '56px',
      },
      minWidth: {
        'touch': '56px',
      },
      animation: {
        'bounce-short': 'bounce 0.6s ease-in-out 2',
        'pulse-subtle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pop': 'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
