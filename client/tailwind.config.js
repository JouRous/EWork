module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        'light-blue': '#4E97C2',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
