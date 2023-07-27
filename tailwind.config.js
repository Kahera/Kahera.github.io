/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['"OpenSans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      'display': ['"Merienda"'], 
      'mono': ['"RedHatMono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace']
    },
    extend: {},
  },
  plugins: [],
}

