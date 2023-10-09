/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [require('osom-ui/tailwind.plugin.osomui'), require('daisyui')],
  daisyui: {
    themes: false,
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    rtl: false,
    prefix: '',
    logs: true,
  },
};
