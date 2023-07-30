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
      'mono': ['"RedHatMono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      'icon': ['"Material Symbols Outlined"']
    },
    extend: {
      colors: {
        'primary': {
          'lightest': '#f9fbee',
          'lighter': '#f7e8de',
          'light': '#E592A6',
          DEFAULT: '#D23C6E',
          'darker': '#913654',
          'darkest': '#261c1f',
          'dusty': {
            'light': '#d08e80',
            'dark': '#d08e80'
          }
        },
        'secondary': {
          'lightest': '#e5f3dd',
          'lighter': '#d6f5db',
          DEFAULT: '#C5ECB1',
          'darker': '#75cc84',
          'darkest': '#45ba93'
        },
        'accent': {
          'lightest': '#d1eff4',
          'lighter': '#6ebac9',
          DEFAULT: '#41557C',
          'dusty': '#525c6f',
          'darker': '#2F3E5B',
          'darkest': '#1E2739',
          'deep': '#0c1018',
        }
      }
    },
  },
  plugins: [],
}

