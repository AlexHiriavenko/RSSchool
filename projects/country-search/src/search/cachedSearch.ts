export type SearchFn<T> = (query: string, signal: AbortSignal) => Promise<T>;

export interface CachedSearchOptions {
    /** Max number of cached queries; the least recently used one is evicted first. */
    maxEntries?: number;
}

export const DEFAULT_MAX_ENTRIES = 50;

interface InFlight<T> {
    controller: AbortController;
    promise: Promise<T>;
    subscribers: number;
}

function normalizeQuery(query: string): string {
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
export function createCachedSearch<T>(
    search: SearchFn<T>,
    { maxEntries = DEFAULT_MAX_ENTRIES }: CachedSearchOptions = {},
): SearchFn<T> {
    const cache = new Map<string, T>();
    const inFlight = new Map<string, InFlight<T>>();

    function remember(key: string, value: T): void {
        cache.delete(key);
        cache.set(key, value);
        if (cache.size > maxEntries) {
            const oldest = cache.keys().next().value;
            if (oldest !== undefined) cache.delete(oldest);
        }
    }

    function startRequest(key: string): InFlight<T> {
        const controller = new AbortController();
        const entry: InFlight<T> = {
            controller,
            promise: search(key, controller.signal),
            subscribers: 0,
        };
        inFlight.set(key, entry);

        const finish = (): boolean => {
            // an entry dropped after its last caller aborted must not touch newer state
            const isCurrent = inFlight.get(key) === entry;
            if (isCurrent) inFlight.delete(key);
            return isCurrent;
        };
        entry.promise.then(
            (value) => {
                if (finish()) remember(key, value);
            },
            () => void finish(),
        );

        return entry;
    }

    function release(key: string, entry: InFlight<T>): void {
        entry.subscribers -= 1;
        if (entry.subscribers > 0) return;
        if (inFlight.get(key) === entry) inFlight.delete(key);
        entry.controller.abort();
    }

    function subscribe(key: string, entry: InFlight<T>, signal: AbortSignal): Promise<T> {
        entry.subscribers += 1;

        return new Promise<T>((resolve, reject) => {
            const onAbort = (): void => {
                release(key, entry);
                reject(signal.reason);
            };
            signal.addEventListener('abort', onAbort, { once: true });

            entry.promise.then(
                (value) => {
                    signal.removeEventListener('abort', onAbort);
                    resolve(value);
                },
                (error: unknown) => {
                    signal.removeEventListener('abort', onAbort);
                    reject(error);
                },
            );
        });
    }

    return async (query, signal) => {
        signal.throwIfAborted();
        const key = normalizeQuery(query);

        if (cache.has(key)) {
            const hit = cache.get(key) as T;
            remember(key, hit); // refresh recency
            return hit;
        }

        const entry = inFlight.get(key) ?? startRequest(key);
        return subscribe(key, entry, signal);
    };
}
