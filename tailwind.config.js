/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FEF3C7",
        primary: "#FF9E80",
        'primary-two': "#FF6F61",
        secondary: "#14B8A6",
        'secondary-two': "#115E59"
      },
    },
  },
  plugins: [],
};
