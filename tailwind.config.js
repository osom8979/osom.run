/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      spacing: {
        'daisy-header': '3rem',
        'daisy-main': 'calc(100vh - theme(spacing.daisy-header))',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui'), require('osom-ui')],
  daisyui: {
    themes: ['cupcake', 'business'],
    darkTheme: 'business',
    base: true,
    styled: true,
    utils: true,
    rtl: false,
    prefix: 'daisy-',
    logs: false,
  },
};
