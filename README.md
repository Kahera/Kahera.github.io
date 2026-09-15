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

```sh
npm install
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
