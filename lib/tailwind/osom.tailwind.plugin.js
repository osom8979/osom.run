/** @type {import('tailwindcss/plugin').Plugin} */
const plugin = require('tailwindcss/plugin');

const osomPlugin = plugin(() => {}, {
  theme: {
    extend: {
      fontFamily: {
        sans: ['sans-serif', 'system-ui'],
        serif: ['serif', 'system-ui'],
        mono: ['monospace', 'system-ui'],
      },
      colors: {
        primary: '#000000',
      },
      spacing: {
        topbar: '2.5rem',
      },
    },
  },
});

module.exports = osomPlugin;
