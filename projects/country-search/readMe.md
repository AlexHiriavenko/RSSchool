# Country Search

Live country search: while you type, the app queries the countries.dev API and shows matching countries. Outdated requests are cancelled, so only the result for the latest input is shown.

#### URL:

https://alexhiriavenko.github.io/RSSchool/country-search/

#### Task:

- https://github.com/rolling-scopes-school/tasks/blob/master/fullstack-engineering/tasks/country-search/README.md

#### Docs:

- [DESIGN.md](./DESIGN.md): how cancellation works, debounce delay, complexity, clean code principles

#### Features:

- Debounced search with request cancellation (`AbortController`) and a timeout
- Loading indicator, "no results" state, error message with a "Retry" button
- Country details dialog on card click
- Bonus: per-query cache with in-flight deduplication, recent searches in `localStorage`

#### Technologies:

- TypeScript (ES modules, no bundler)

#### Tools:

- ESLint / Prettier / Husky / lint-staged
- Vitest
- gh-pages (deploy)

#### Scripts:

- `npm run dev`: build, watch and serve `dist` on http://localhost:3000
- `npm run build`: compile TypeScript and copy static files to `dist`
- `npm test`: run unit tests
- `npm run lint`: ESLint
- `npm run deploy`: build and publish `dist` to GitHub Pages
