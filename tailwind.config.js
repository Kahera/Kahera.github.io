import { green, yellow, red, transparent, zinc } from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
export const darkMode = 'class'
export const content = [
  "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
]
export const theme = {
   screens: {
      'xxs': '320px',
      'xs': '475px',
      ...defaultTheme.screens,
   },
   fontFamily: {
      'sans': ['Seravek, "Gill Sans Nova", Ubuntu, Calibri, "DejaVu Sans", source-sans-pro, sans-serif'],
      'display': ['"Merienda"'],
      'mono': ['ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, "DejaVu Sans Mono", monospace'],
      'icon': ['"Material Symbols Outlined"']
   },
   colors: {
      transparent: transparent,
      primary: {
         lightest: "rgb(249 251 238 / <alpha-value>)",
         lighter: "rgb(247 232 222 / <alpha-value>)",
         light: "rgb(229 146 166 / <alpha-value>)",
         DEFAULT: "rgb(210 60 110 / <alpha-value>)",
         dark: "rgb(178 57 97 / <alpha-value>)",
         darker: "rgb(145 54 84 / <alpha-value>)",
         darkest: "rgb(38 28 31 / <alpha-value>)",
      },
      secondary: {
         lightest: "rgb(214 245 219 / <alpha-value>)",
         light: "rgb(197 236 177 / <alpha-value>)",
         DEFAULT: "rgb(117 204 132 / <alpha-value>)",
         dark: "rgb(98 181 121 / <alpha-value>)",
         darker: "rgb(79 158 110 / <alpha-value>)",
         darkest: "rgb(41 112 88 / <alpha-value>)",
      },
      accent: {
         lightest: "rgb(209 239 244 / <alpha-value>)",
         lighter: "rgb(160 213 223 / <alpha-value>)",
         light: "rgb(110 186 201 / <alpha-value>)",
         DEFAULT: "rgb(65 85 124 / <alpha-value>)",
         dark: "rgb(47 62 91 / <alpha-value>)",
         darker: "rgb(30 39 57 / <alpha-value>)",
         darkest: "rgb(12 16 24 / <alpha-value>)",
      },
      neutral: zinc,
      success: green[500],
      warning: yellow[500],
      danger: red[500]
   },
   extend: {
      transitionDuration: {
         '250': '250ms',
      }
   },
}
export const plugins = []
