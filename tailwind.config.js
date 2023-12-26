import { gray, green, yellow, red, transparent } from 'tailwindcss/colors';
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
         lightest: "rgb(var(--color-primary-lightest) / <alpha-value>)",
         lighter: "rgb(var(--color-primary-lighter) / <alpha-value>)",
         light: "rgb(var(--color-primary-light) / <alpha-value>)",
         DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
         dark: "rgb(var(--color-primary-dark) / <alpha-value>)",
         darker: "rgb(var(--color-primary-darker) / <alpha-value>)",
         darkest: "rgb(var(--color-primary-darkest) / <alpha-value>)",
      },
      secondary: {
         lightest: "rgb(var(--color-secondary-lightest) / <alpha-value>)",
         light: "rgb(var(--color-secondary-light) / <alpha-value>)",
         DEFAULT: "rgb(var(--color-secondary) / <alpha-value>)",
         dark: "rgb(var(--color-secondary-dark) / <alpha-value>)",
         darker: "rgb(var(--color-secondary-darker) / <alpha-value>)",
         darkest: "rgb(var(--color-secondary-darkest) / <alpha-value>)",
      },
      accent: {
         lightest: "rgb(var(--color-accent-lightest) / <alpha-value>)",
         lighter: "rgb(var(--color-accent-lighter) / <alpha-value>)",
         light: "rgb(var(--color-accent-light) / <alpha-value>)",
         DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
         dark: "rgb(var(--color-accent-dark) / <alpha-value>)",
         darker: "rgb(var(--color-accent-darker) / <alpha-value>)",
         darkest: "rgb(var(--color-accent-darkest) / <alpha-value>)",
      },
      neutral: gray,
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
