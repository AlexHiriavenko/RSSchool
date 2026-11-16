import { describe, expect, it, vi } from 'vitest';
import { createCachedSearch } from './cachedSearch';

interface Call {
    query: string;
    signal: AbortSignal;
    resolve: (value: { name: string }[]) => void;
    reject: (reason: unknown) => void;
}

/** Underlying search mock: the test resolves requests manually; abort rejects like real fetch. */
function createSearchMock() {
    const calls: Call[] = [];
    const search = vi.fn((query: string, signal: AbortSignal) => {
        return new Promise<{ name: string }[]>((resolve, reject) => {
            calls.push({ query, signal, resolve, reject });
            signal.addEventListener('abort', () => reject(signal.reason));
        });
    });
    return { search, calls };
}

const germany = [{ name: 'Germany' }];
const georgia = [{ name: 'Georgia' }];

describe('createCachedSearch', () => {
    it('calls the underlying search and returns its result', async () => {
        const { search, calls } = createSearchMock();
        const cached = createCachedSearch(search);

        const promise = cached('ger', new AbortController().signal);
        calls[0]?.resolve(germany);

        await expect(promise).resolves.toEqual(germany);
        expect(search).toHaveBeenCalledTimes(1);
    });

    it('serves a repeated query from the cache without a new request', async () => {
        const { search, calls } = createSearchMock();
        const cached = createCachedSearch(search);

        const first = cached('ger', new AbortController().signal);
        calls[0]?.resolve(germany);
        await first;

        await expect(cached('ger', new AbortController().signal)).resolves.toEqual(germany);
        expect(search).toHaveBeenCalledTimes(1);
    });

    it('normalizes the query (trim + lowercase) for the key and the request', async () => {
        const { search, calls } = createSearchMock();
        const cached = createCachedSearch(search);

        const first = cached('  Ger ', new AbortController().signal);
        calls[0]?.resolve(germany);
        await first;
        await cached('GER', new AbortController().signal);

        expect(search).toHaveBeenCalledTimes(1);
        expect(calls[0]?.query).toBe('ger');
    });

    it('makes separate requests for different queries', () => {
        const { search } = createSearchMock();
        const cached = createCachedSearch(search);

        void cached('ger', new AbortController().signal);
        void cached('geo', new AbortController().signal);

        expect(search).toHaveBeenCalledTimes(2);
    });

    it('caches an empty result too', async () => {
        const { search, calls } = createSearchMock();
        const cached = createCachedSearch(search);

        const first = cached('zzzz', new AbortController().signal);
        calls[0]?.resolve([]);
        await first;
        await expect(cached('zzzz', new AbortController().signal)).resolves.toEqual([]);

        expect(search).toHaveBeenCalledTimes(1);
    });

    describe('in-flight deduplication', () => {
        it('shares one request between concurrent callers of the same query', async () => {
            const { search, calls } = createSearchMock();
            const cached = createCachedSearch(search);

            const a = cached('ger', new AbortController().signal);
            const b = cached('ger', new AbortController().signal);
            calls[0]?.resolve(germany);

            await expect(Promise.all([a, b])).resolves.toEqual([germany, germany]);
            expect(search).toHaveBeenCalledTimes(1);
        });

        it('lets each caller cancel independently: others still get the result', async () => {
            const { search, calls } = createSearchMock();
            const cached = createCachedSearch(search);
            const controllerA = new AbortController();
            const controllerB = new AbortController();

            const a = cached('ger', controllerA.signal);
            const b = cached('ger', controllerB.signal);
            controllerA.abort();

            await expect(a).rejects.toMatchObject({ name: 'AbortError' });
            expect(calls[0]?.signal.aborted).toBe(false);

            calls[0]?.resolve(germany);
            await expect(b).resolves.toEqual(germany);
        });

        it('aborts the underlying request only when every caller has aborted', async () => {
            const { search, calls } = createSearchMock();
            const cached = createCachedSearch(search);
            const controllerA = new AbortController();
            const controllerB = new AbortController();

            const a = cached('ger', controllerA.signal);
            const b = cached('ger', controllerB.signal);
            controllerA.abort();
            expect(calls[0]?.signal.aborted).toBe(false);
            controllerB.abort();

            expect(calls[0]?.signal.aborted).toBe(true);
            await expect(a).rejects.toMatchObject({ name: 'AbortError' });
            await expect(b).rejects.toMatchObject({ name: 'AbortError' });
        });

        it('starts a fresh request after all callers aborted (no poisoned entry)', async () => {
            const { search, calls } = createSearchMock();
            const cached = createCachedSearch(search);
            const controller = new AbortController();

            const aborted = cached('ger', controller.signal);
            controller.abort();
            await aborted.catch(() => undefined);

            const next = cached('ger', new AbortController().signal);
            expect(search).toHaveBeenCalledTimes(2);
            expect(calls[1]?.signal.aborted).toBe(false);

            calls[1]?.resolve(germany);
            await expect(next).resolves.toEqual(germany);
        });
    });

    it('rejects with AbortError and makes no request for an already aborted signal', async () => {
        const { search } = createSearchMock();
        const cached = createCachedSearch(search);
        const controller = new AbortController();
        controller.abort();

        await expect(cached('ger', controller.signal)).rejects.toMatchObject({
            name: 'AbortError',
        });
        expect(search).not.toHaveBeenCalled();
    });

    it('does not cache errors: the next call retries', async () => {
        const { search, calls } = createSearchMock();
        const cached = createCachedSearch(search);

        const failed = cached('ger', new AbortController().signal);
        calls[0]?.reject(new Error('boom'));
        await expect(failed).rejects.toThrow('boom');

        const retry = cached('ger', new AbortController().signal);
        calls[1]?.resolve(germany);

        await expect(retry).resolves.toEqual(germany);
        expect(search).toHaveBeenCalledTimes(2);
    });

    it('evicts the oldest entry when maxEntries is exceeded', async () => {
        const { search, calls } = createSearchMock();
        const cached = createCachedSearch(search, { maxEntries: 2 });

        for (const [index, query] of ['a', 'b', 'c'].entries()) {
            const promise = cached(query, new AbortController().signal);
            calls[index]?.resolve(georgia);
            await promise;
        }
        expect(search).toHaveBeenCalledTimes(3);

        void cached('c', new AbortController().signal); // still cached
        void cached('b', new AbortController().signal); // still cached
        expect(search).toHaveBeenCalledTimes(3);

        void cached('a', new AbortController().signal); // evicted
        expect(search).toHaveBeenCalledTimes(4);
    });
});
