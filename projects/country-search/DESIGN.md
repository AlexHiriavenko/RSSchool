# Country Search: design notes

Live country search on TypeScript. While the user types, the app queries
`GET https://countries.dev/name/{query}` and renders the matches. The interesting part is
not the UI but everything between a keystroke and the screen: debouncing, cancellation of
outdated requests, timeouts, error classification and keeping the UI consistent when
responses arrive out of order.

## Architecture

```
src/
  utils/debounce.ts            debounce(fn, delay) + cancel()
  api/
    errors.ts                  HttpError, classifyError()
    searchCountries.ts         fetch wrapper: 404 -> [], !ok -> HttpError, timeout, abort
    mapCountryResponse.ts      pure mapper: API shape -> app model (Country)
    types.ts                   raw API types
  search/
    searchController.ts        state machine + cancellation + stale-response guard (no DOM)
    cachedSearch.ts            bonus: per-query cache + in-flight deduplication
    searchHistory.ts           bonus: recent queries in localStorage
  ui/                          DOM only: el(), app, card, details dialog, formatters
  main.ts                      wiring
```

The dependency direction is one-way: `ui -> search -> api -> utils`. Nothing below `ui/`
touches the DOM, so all logic is tested in Node without a browser or the network.
`index.html` has an empty `body` apart from the module script, and no dynamic content is
rendered through `innerHTML` or `insertAdjacentHTML`: [dom.ts](src/ui/dom.ts) only uses
`textContent`, attributes and `append`, so API data can never inject markup.

## How cancellation works and why

**The problem.** The user types `g`, `ge`, `ger`. Requests can finish in any order: the
response for `g` (many countries, slower) may arrive after the response for `ger`. If the
UI renders whichever response comes last, it shows results that do not match the input.
Ignoring a stale response is not enough on its own: the browser would still download it and
keep the connection busy. So outdated requests are actually cancelled.

**The mechanism, in layers:**

1. **One `AbortController` per request.**
   [`SearchController.search()`](src/search/searchController.ts) first aborts the previous
   controller (`abortCurrentRequest()`), then creates a new one. Aborting makes `fetch`
   reject with an `AbortError` and the browser marks the request as `canceled` in the
   Network tab. The `fetch` call itself happens synchronously, before the first `await`, so
   the old request is always aborted before the new one starts.

    The in-flight request is also aborted **on every input change**, in `input()`, before the
    debounce timer fires. The user has already changed the text, so the result of the old
    request is outdated and there is no reason to keep downloading it for the next 300 ms.

2. **A stale-response guard** (`isStale`). After every `await` the controller checks that
   its own request is still the current one. A superseded request never touches the state,
   neither on success nor on error. This is a second line of defence for the case where a
   response wins the race against `abort()` (the response was already fully received) or
   where something below does not honour the signal. It is covered by a separate test that
   uses a `fetch` mock which ignores abort.

3. **Own cancellation is not an error.** [`classifyError`](src/api/errors.ts) separates
   `AbortError` (`aborted`) from `TimeoutError` (`timeout`), `HttpError` (`http`), a
   `TypeError` from `fetch` (`network`) and everything else (`unknown`). `aborted` is
   swallowed in the controller and never reaches the UI; the other kinds become an error
   state with a "Retry" button.

4. **Timeout.** [`searchCountries`](src/api/searchCountries.ts) combines the caller's
   signal with `AbortSignal.timeout(8000)` through `AbortSignal.any`. The two reasons stay
   distinguishable: the user's abort rejects with `AbortError`, the timer with
   `TimeoutError`. A hung request therefore turns into a clear "took too long" message
   instead of an endless spinner, and a user cancellation is never reported as a timeout.

5. **Empty input.** Clearing the input aborts whatever is in flight, drops a pending
   debounced call (`debounced.cancel()`) and returns to `idle` without any request.

6. **Cancellation through the cache (bonus).**
   [`createCachedSearch`](src/search/cachedSearch.ts) lets concurrent callers share one
   request, but every caller keeps its own `AbortSignal`. Aborting one caller rejects only
   that caller's promise. The shared request is aborted only when the last interested
   caller is gone (a subscriber counter). An aborted or failed request is removed from the
   in-flight map at once and is never cached, so the next call starts a clean request.

**Why `AbortController` and not just a request counter?** A counter only hides outdated
responses. Aborting also frees the network, stops parsing JSON nobody will use and makes the
behaviour observable and testable (`signal.aborted`). The guard from point 2 is kept as a
cheap safety net.

## Debounce delay: 300 ms

`input()` waits 300 ms after the last keystroke before searching
([`DEFAULT_DEBOUNCE_MS`](src/search/searchController.ts)).

- Gaps between keystrokes of a casual typist are roughly 100-300 ms, so intermediate
  prefixes such as `g`, `ge` are mostly skipped and one request is sent for the finished
  fragment. That saves requests and server load.
- 300 ms is near the threshold where a delay starts to feel like lag, so results still look
  instant after the user stops typing.
- Lower values (about 100 ms) would send almost every keystroke; higher values (500 ms and
  more) make the search feel sluggish.
- Debounce reduces requests, cancellation fixes correctness. The pauses that are longer
  than 300 ms still produce overlapping requests, and these are handled by the mechanism
  above. They do not compete.

The delay is a constructor option, so tests run with fake timers and any value.

Two details: an empty input is handled immediately, because showing stale results for 300 ms
after the field was cleared would be wrong; and an immediate `search()` (a click on a history
chip) cancels a pending debounced call, so an old typed query cannot fire later and override
the newer action.

## Complexity

Let `n` be the number of countries in a response, `k` the number of languages, borders and
currencies of one country, and `q` the length of the query string.

**`mapCountryResponse`**: time **O(n * k)**, which is **O(n)** because `k` is bounded by a
small constant in real data (a country has a handful of languages, up to about a dozen
borders). It is one pass over the array: `raw.map(mapCountry)`, and each country maps its
inner arrays once. Memory: **O(n * k)**, one new object per country. The function is pure
and does not mutate its input.

**Cache (`createCachedSearch`)**:

| Operation                                      | Time         |
| ---------------------------------------------- | ------------ |
| Normalizing the key (`trim`, `toLowerCase`)    | O(q)         |
| Cache lookup / insert (`Map`)                  | O(1) average |
| LRU refresh (delete + set)                     | O(1)         |
| Eviction of the oldest entry (`keys().next()`) | O(1)         |
| Joining / leaving an in-flight request         | O(1)         |

Memory is bounded: at most `maxEntries` (50) cached queries, each holding one response.

**History**: `add` / `remove` are **O(h)** where `h <= 10` is the limit, so effectively
constant; they include one `JSON.stringify` of at most 10 short strings.

**`debounce`**: O(1) per call (`clearTimeout` + `setTimeout`).

## Clean code principles and where to see them

| Principle                                                    | Where                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Single responsibility.** One module, one reason to change. | `debounce` ([debounce.ts](src/utils/debounce.ts)) only delays calls. [`searchCountries`](src/api/searchCountries.ts) only talks to the API. [`mapCountryResponse`](src/api/mapCountryResponse.ts) only maps data. [`SearchController`](src/search/searchController.ts) only owns state and cancellation. `ui/` only renders. |
| **Pure functions, side effects at the edges.**               | `mapCountryResponse` and the formatters in [format.ts](src/ui/format.ts) are pure. All I/O is in `searchCountries`, `SearchHistory` and `ui/`.                                                                                                                                                                               |
| **Separation of logic and UI.**                              | The controller is a state machine with `subscribe` / `getState`; the DOM layer ([app.ts](src/ui/app.ts)) only renders a `SearchState`.                                                                                                                                                                                       |
| **Dependency injection.**                                    | `SearchController` takes `search`, `history`, `debounceMs`, `timeoutMs`; `SearchHistory` takes a `StorageLike` ([searchHistory.ts](src/search/searchHistory.ts)); `createCachedSearch` wraps any `SearchFn`. This is why every test runs without a browser.                                                                  |
| **Make illegal states unrepresentable.**                     | `SearchState` is a discriminated union ([searchController.ts](src/search/searchController.ts)): `countries` exists only in `success`, `kind` only in `error`. `renderState` in [app.ts](src/ui/app.ts) switches on `status`, so each state is rendered by its own branch.                                                    |
| **Explicit errors, no magic values.**                        | `HttpError` carries the status; `classifyError` maps unknown values to a closed `ErrorKind` set. A 404 is a normal "no results" outcome, not an exception.                                                                                                                                                                   |
| **Named constants instead of magic numbers.**                | `DEFAULT_DEBOUNCE_MS`, `DEFAULT_TIMEOUT_MS`, `DEFAULT_MAX_ENTRIES`, `DEFAULT_HISTORY_LIMIT`, `API_BASE_URL`.                                                                                                                                                                                                                 |
| **Defensive boundaries.**                                    | The API shape is described once in [types.ts](src/api/types.ts) and every optional field gets a safe default in the mapper (`null` / `[]`); the UI decides how to display "no value". `SearchHistory` survives broken JSON and unavailable storage.                                                                          |
| **Small functions and early returns.**                       | `search()` returns early for empty input and for stale responses; `buildDescription` and `mapCountry` are small and named for what they do.                                                                                                                                                                                  |
| **Do not mutate arguments.**                                 | `mapCountryResponse` copies arrays (`[...borders]`); `SearchHistory.getAll()` returns a copy. Both have tests.                                                                                                                                                                                                               |
| **Comments explain why, not what.**                          | See the doc comments in `search()` (why `fetch` runs synchronously) and in [`cachedSearch.ts`](src/search/cachedSearch.ts) (why errors are not cached).                                                                                                                                                                      |
| **Security by construction.**                                | No `innerHTML`; text goes through `textContent` ([dom.ts](src/ui/dom.ts)).                                                                                                                                                                                                                                                   |

## Decisions and trade-offs

- **The API has no `description` field.** The detail view shows a sentence built by
  `buildDescription` from `demonym` and `subregion` / `region`
  (`Germany is a German country in Central Europe.`). It is `null` when neither field is
  available. The mapper is the single place for this decision.
- **Missing values are `null`, not placeholders.** `Country.capital` is `string | null`;
  the dash shown in the UI is a presentation concern ([format.ts](src/ui/format.ts)).
- **`tsc` without a bundler.** Output is ES modules loaded via `<script type="module">`,
  so relative imports carry a `.js` extension (`module: NodeNext`).
- **Cache scope.** The cache lives in memory for one page session and has no TTL: country
  data changes rarely, and a reload gives a fresh start. Entries are bounded by
  `maxEntries`.
- **History records only useful queries.** A query is saved only when it produced results;
  errors, 404 and empty input do not pollute the history.

## Testing and workflow

- Vitest, fake timers for `debounce` and the controller, `fetch` mocked per test. No test
  touches the network. Real API responses are stored as JSON fixtures
  ([\_\_fixtures\_\_](src/api/__fixtures__)).
- **TDD.** For `debounce`, `searchCountries`, `mapCountryResponse` and error classification
  a commit with failing tests comes before the commit with the implementation. The race
  condition test ([searchController.race.test.ts](src/search/searchController.race.test.ts))
  is a separate commit: the mocked `fetch` resolves an earlier request after a later one
  and rejects on abort. The cache and the history also follow test-first commits.
- Pre-commit runs only `lint-staged` (ESLint + Prettier); pre-push runs `npm test`.
