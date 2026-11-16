import { classifyError, type ErrorKind } from '../api/errors.js';
import { mapCountryResponse, type Country } from '../api/mapCountryResponse.js';
import { searchCountries } from '../api/searchCountries.js';
import type { RawCountry } from '../api/types.js';
import { debounce } from '../utils/debounce.js';
import { createCachedSearch, type SearchFn } from './cachedSearch.js';
import type { SearchHistory } from './searchHistory.js';

export const DEFAULT_DEBOUNCE_MS = 300;

export type SearchState =
    | { status: 'idle' }
    | { status: 'loading'; query: string }
    | { status: 'success'; query: string; countries: Country[] }
    | { status: 'empty'; query: string }
    | { status: 'error'; query: string; kind: Exclude<ErrorKind, 'aborted'> };

export type SearchListener = (state: SearchState) => void;

export interface SearchControllerOptions {
    debounceMs?: number;
    timeoutMs?: number;
    /** Replaces the default (cached) search; mainly for tests. */
    search?: SearchFn<RawCountry[]>;
    /** If given, every successful query is recorded here. */
    history?: SearchHistory;
}

/**
 * Owns the search state machine and request cancellation. Has no DOM dependency.
 * Only the most recent request may change the state: every new search aborts the
 * previous one, and a response of a superseded request is ignored even if it arrives.
 */
export class SearchController {
    private state: SearchState = { status: 'idle' };
    private readonly listeners = new Set<SearchListener>();
    private currentRequest: AbortController | null = null;
    private lastQuery = '';
    private readonly searchFn: SearchFn<RawCountry[]>;
    private readonly history: SearchHistory | undefined;
    private readonly debouncedSearch: ReturnType<typeof debounce<[string]>>;

    constructor({
        debounceMs = DEFAULT_DEBOUNCE_MS,
        timeoutMs,
        search,
        history,
    }: SearchControllerOptions = {}) {
        this.searchFn =
            search ??
            createCachedSearch((query, signal) => searchCountries(query, signal, { timeoutMs }));
        this.history = history;
        this.debouncedSearch = debounce((query: string) => void this.search(query), debounceMs);
    }

    getState(): SearchState {
        return this.state;
    }

    subscribe(listener: SearchListener): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    /** Entry point for typing: empty input is handled immediately, other input is debounced. */
    input(query: string): void {
        if (!query.trim()) {
            this.debouncedSearch.cancel();
            void this.search('');
            return;
        }
        this.debouncedSearch(query);
    }

    /** Repeats the last non-empty query (used by the "Retry" button). */
    retry(): Promise<void> {
        return this.search(this.lastQuery);
    }

    /**
     * Runs a search immediately. The fetch call happens synchronously (before the first await),
     * so the previous request is always aborted before the new one starts.
     * The returned promise settles when the request is finished or cancelled.
     */
    async search(rawQuery: string): Promise<void> {
        const query = rawQuery.trim();

        this.debouncedSearch.cancel(); // an immediate search supersedes a pending typed one

        this.currentRequest?.abort();
        this.currentRequest = null;

        if (!query) {
            this.lastQuery = '';
            this.setState({ status: 'idle' });
            return;
        }

        const request = new AbortController();
        this.currentRequest = request;
        this.lastQuery = query;
        this.setState({ status: 'loading', query });

        try {
            const raw = await this.searchFn(query, request.signal);
            if (this.isStale(request)) return;

            const countries = mapCountryResponse(raw);
            if (countries.length > 0) this.history?.add(query);
            this.setState(
                countries.length > 0
                    ? { status: 'success', query, countries }
                    : { status: 'empty', query },
            );
        } catch (error) {
            if (this.isStale(request)) return;

            const kind = classifyError(error);
            if (kind === 'aborted') return;
            this.setState({ status: 'error', query, kind });
        }
    }

    private isStale(request: AbortController): boolean {
        return this.currentRequest !== request;
    }

    private setState(state: SearchState): void {
        this.state = state;
        this.listeners.forEach((listener) => listener(state));
    }
}
