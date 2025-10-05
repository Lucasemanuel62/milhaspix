/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      colors: {
        'primary-02': '#1E90FF',
        'primary-01': '#CAE6FB',
        'pb-03': '#E2E2E2',
        'alert-04': '#DC2B2B',
      },
      fontFamily: {
        'dmsans': ['DM Sans', 'sans-serif'],
        'dmsans-medium': ['DM Sans', 'sans-serif'],
      },
      fontWeight: {
        'medium': '500',
      }
    },
  },
  plugins: [],
}

