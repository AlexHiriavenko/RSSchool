export const DEFAULT_MAX_ENTRIES = 50;
function normalizeQuery(query) {
    return query.trim().toLowerCase();
}
/**
 * Wraps a search function with a per-query cache and in-flight deduplication.
 * - A repeated query is answered from the cache (Map lookup, O(1)).
 * - Concurrent calls with the same query share one underlying request.
 * - Every caller keeps its own AbortSignal: aborting one caller rejects only that caller;
 *   the shared request is aborted when the last interested caller is gone.
 * - Errors and aborted requests are never cached.
 */
export function createCachedSearch(search, { maxEntries = DEFAULT_MAX_ENTRIES } = {}) {
    const cache = new Map();
    const inFlight = new Map();
    function remember(key, value) {
        cache.delete(key);
        cache.set(key, value);
        if (cache.size > maxEntries) {
            const oldest = cache.keys().next().value;
            if (oldest !== undefined)
                cache.delete(oldest);
        }
    }
    function startRequest(key) {
        const controller = new AbortController();
        const entry = {
            controller,
            promise: search(key, controller.signal),
            subscribers: 0,
        };
        inFlight.set(key, entry);
        const finish = () => {
            // an entry dropped after its last caller aborted must not touch newer state
            const isCurrent = inFlight.get(key) === entry;
            if (isCurrent)
                inFlight.delete(key);
            return isCurrent;
        };
        entry.promise.then((value) => {
            if (finish())
                remember(key, value);
        }, () => void finish());
        return entry;
    }
    function release(key, entry) {
        entry.subscribers -= 1;
        if (entry.subscribers > 0)
            return;
        if (inFlight.get(key) === entry)
            inFlight.delete(key);
        entry.controller.abort();
    }
    function subscribe(key, entry, signal) {
        entry.subscribers += 1;
        return new Promise((resolve, reject) => {
            const onAbort = () => {
                release(key, entry);
                reject(signal.reason);
            };
            signal.addEventListener('abort', onAbort, { once: true });
            entry.promise.then((value) => {
                signal.removeEventListener('abort', onAbort);
                resolve(value);
            }, (error) => {
                signal.removeEventListener('abort', onAbort);
                reject(error);
            });
        });
    }
    return async (query, signal) => {
        signal.throwIfAborted();
        const key = normalizeQuery(query);
        if (cache.has(key)) {
            const hit = cache.get(key);
            remember(key, hit); // refresh recency
            return hit;
        }
        const entry = inFlight.get(key) ?? startRequest(key);
        return subscribe(key, entry, signal);
    };
}
//# sourceMappingURL=cachedSearch.js.map