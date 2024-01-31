/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      spacing: {
        'osom-header': '3rem',
        'osom-main': 'calc(100vh - theme(spacing.osom-header))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('osom-ui/tailwind.plugin.osomui'),
    require('daisyui'),
  ],
  daisyui: {
    themes: ['cupcake', 'business'],
    darkTheme: 'business',
    base: true,
    styled: true,
    utils: true,
    rtl: false,
    prefix: '',
    logs: false,
  },
};
