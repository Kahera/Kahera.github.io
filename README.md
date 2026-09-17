# junehansen.no

## Design and Content

The Workshop design is implemented in [HomeView.vue](src/views/Home/HomeView.vue)
using Tailwind CSS. The original color palette and Merienda font are retained;
Source Sans 3 and Fraunces are bundled locally. The earlier design studies remain
in [mockups.html](mockups.html).

- Edit the introduction, work summary, and hobbies under `home` in
    [en.json](src/i18n/en.json) and [no.json](src/i18n/no.json).
- [FocusSection.vue](src/components/FocusSection.vue) provides alternating focus
    rows. Set `tone` (`rose`, `green`, or `blue`), `tinted`, `reverse`, and
    `headingLevel`. Use an `h2` for a standalone section and an `h3` inside a group.
- On the homepage, add, remove, or reorder entries in `workSections` and `interests`.
    Left/right placement is derived from their combined order, so the pattern
    continues across the Work/Hobbies boundary without per-section `reverse` flags.
    Colors remain independently configurable, and mobile keeps text before media.
- Supply `image: { src, alt, caption? }` to replace the decorative symbol with a
    photo. The component reserves the image area and lazy-loads photos. Its default,
    `links`, and `media` slots support richer content without changing the layout.
- Theme and language choices are saved locally. Without a saved theme, the site
    uses the system preference. Theme colors live in
    [theme.css](src/assets/theme.css).
- `/about` redirects to the homepage; `/resume` redirects to the work section.
    LinkedIn replaces the public CV. The previous view files remain in the source
    but are no longer routed or bundled.

### Next Content Pass

- Refine the short work and hobby descriptions in both languages.
- Add personal work/hobby photos and meaningful alternative text.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

Bruk Node.js 24 LTS (minst 24.15.0), som også brukes i CI. Node.js 22 krever
minst 22.22.2; Node.js 26 eller nyere støttes også av avhengighetenes Node-krav.

TypeScript beholdes på 6.0.x: nyeste `typescript-eslint` krever TypeScript
`<6.1.0`, så TypeScript 7 kan ikke brukes med dagens ESLint-oppsett.

`esbuild` er en eksplisitt utviklingsavhengighet for å oppfylle Vites peer-krav.
i18n-verktøyet får sin egen kompatible 0.25.x-versjon som indirekte avhengighet.

Installasjonen kan varsle om utfaset `vue-i18n` 10 via i18n-verktøyets indirekte
avhengigheter. Selve nettstedet bruker 11.4.12; den indirekte hovedversjonen
overstyres ikke uten støtte fra verktøyets vedlikeholdere.

```sh
npm ci
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Run Tests

```sh
npm run test -- --run
```

Tests cover the focus component, page structure, translations, theme controls,
and legacy URL redirects.
