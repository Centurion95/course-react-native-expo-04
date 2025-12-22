/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./presentation/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {

      colors: {
        // primary: '#1E40AF',
        // secondary: '#FBBF24',
        primary: '#49129C',
        secondary: {
          DEFAULT: '#B40086',
          100: '#C51297',
          200: '#831266',
        },
        tertiary: '#EF2967',
        accent: '#10B981',
        background: '#F3F4F6',
        textPrimary: '#111827',
        textSecondary: '#6B7280',
      },

      fontFamily: {
        'work-black': ['WorkSans-Black', 'sans-serif'],
        'work-light': ['WorkSans-Light', 'sans-serif'],
        'work-Medium': ['WorkSans-Medium', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

