export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'Inter', 'sans-serif'],
        suit: ['SUIT', 'sans-serif'],
      },
      colors: {
        brand: {
          purple: '#A020F0',
          offWhite: '#F5F5F5',
        }
      }
    }
  },
  plugins: [],
}