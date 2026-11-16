import { classifyError } from '../api/errors.js';
import { mapCountryResponse } from '../api/mapCountryResponse.js';
import { searchCountries } from '../api/searchCountries.js';
import { debounce } from '../utils/debounce.js';
import { createCachedSearch } from './cachedSearch.js';
export const DEFAULT_DEBOUNCE_MS = 300;
/**
 * Owns the search state machine and request cancellation. Has no DOM dependency.
 * Only the most recent request may change the state: every new search aborts the
 * previous one, and a response of a superseded request is ignored even if it arrives.
 */
export class SearchController {
    state = { status: 'idle' };
    listeners = new Set();
    currentRequest = null;
    lastQuery = '';
    searchFn;
    history;
    debouncedSearch;
    constructor({ debounceMs = DEFAULT_DEBOUNCE_MS, timeoutMs, search, history, } = {}) {
        this.searchFn =
            search ??
                createCachedSearch((query, signal) => searchCountries(query, signal, { timeoutMs }));
        this.history = history;
        this.debouncedSearch = debounce((query) => void this.search(query), debounceMs);
    }
    getState() {
        return this.state;
    }
    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }
    /** Entry point for typing: empty input is handled immediately, other input is debounced. */
    input(query) {
        if (!query.trim()) {
            this.debouncedSearch.cancel();
            void this.search('');
            return;
        }
        this.debouncedSearch(query);
    }
    /** Repeats the last non-empty query (used by the "Retry" button). */
    retry() {
        return this.search(this.lastQuery);
    }
    /**
     * Runs a search immediately. The fetch call happens synchronously (before the first await),
     * so the previous request is always aborted before the new one starts.
     * The returned promise settles when the request is finished or cancelled.
     */
    async search(rawQuery) {
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
            if (this.isStale(request))
                return;
            const countries = mapCountryResponse(raw);
            if (countries.length > 0)
                this.history?.add(query);
            this.setState(countries.length > 0
                ? { status: 'success', query, countries }
                : { status: 'empty', query });
        }
        catch (error) {
            if (this.isStale(request))
                return;
            const kind = classifyError(error);
            if (kind === 'aborted')
                return;
            this.setState({ status: 'error', query, kind });
        }
    }
    isStale(request) {
        return this.currentRequest !== request;
    }
    setState(state) {
        this.state = state;
        this.listeners.forEach((listener) => listener(state));
    }
}
//# sourceMappingURL=searchController.js.map