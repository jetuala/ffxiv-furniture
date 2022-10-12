/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'sm': '640px',
      'md': '960px',
      'lg': '1380px', 
    },
    extend: {}
  },
  plugins: [],
});
