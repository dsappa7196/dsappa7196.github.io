/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        base: '1.125rem', // 18px instead of 16px
        lg: '1.25rem',    // 20px
        xl: '1.375rem',   // 22px
        '2xl': '1.75rem', // 28px
        '3xl': '2.25rem', // 36px
      },
    },
  },
  plugins: [],
}
