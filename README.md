# junehansen.no

## Design og innhold

Det personlige nettstedet er bygget med Vue, TypeScript og Tailwind CSS.
[src/views/Home/HomeView.vue](src/views/Home/HomeView.vue) viser arbeid og fritid.
Merienda, Source Sans 3 og Fraunces leveres lokalt; ikonene bruker Material Symbols.

- Oppdater innhold under `home` i [src/i18n/en.json](src/i18n/en.json) og
    [src/i18n/no.json](src/i18n/no.json). Begge språk skal ha de samme nøklene.
    Den språkavhengige LinkedIn-adressen ligger under `links.linkedIn` og brukes
    i navigasjonen, arbeidsseksjonen og bunnteksten.
- [src/components/FocusSection.vue](src/components/FocusSection.vue) støtter
    `tone` (`rose`, `blue`, `green`, `honey`, `plum`), `tinted`, `reverse` og
    `headingLevel`. Bruk `h2` for en selvstendig seksjon og `h3` inni en gruppe.
- Legg til, fjern eller flytt elementer i `workSections` og `interests` på
    forsiden. Vekslingen mellom venstre og høyre følger den samlede rekkefølgen.
    På mobil vises teksten før bildet eller ikonet.
- `image: { src, alt, caption? }` erstatter et dekorativt ikon med et bilde.
    Bildene lastes ved behov. Slottene `default`, `links` og `media` kan brukes
    for rikere innhold.
- Tema og språkvalg lagres lokalt. Uten lagret tema brukes systemets innstilling.
    Fargene ligger i [src/assets/theme.css](src/assets/theme.css), og felles
    stiler i [src/assets/base.css](src/assets/base.css).
- Gamle visninger, CV-data og designutkast er fjernet. `/about` videresendes
    fortsatt til forsiden, og `/resume` til arbeidsseksjonen, slik at gamle
    bokmerker fungerer. Se [src/router/index.ts](src/router/index.ts).
- [public/404.html](public/404.html) og oppstarten i [src/main.ts](src/main.ts)
    bevarer direktelenker på GitHub Pages. Ukjente adresser viser
    [src/views/NotFound/NotFoundView.vue](src/views/NotFound/NotFoundView.vue),
    med en lenke tilbake til forsiden.

## Editor

Bruk [VS Code](https://code.visualstudio.com/) med
[Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar).
`vue-tsc` typekontrollerer Vue-komponentene ved bygging.

Se [Vite-dokumentasjonen](https://vitejs.dev/config/) for byggkonfigurasjon.

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

Testene dekker seksjonskomponenten, sidestrukturen, oversettelser, delte lenker,
temavalg, gamle adresser og retur fra 404-siden på begge språk.
