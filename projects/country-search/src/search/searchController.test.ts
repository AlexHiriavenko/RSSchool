import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SearchController, type SearchState } from './searchController';

const germany = { name: 'Germany', capital: 'Berlin', region: 'Europe', population: 83240525 };

function jsonResponse(body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body), { status });
}

function hangingFetch() {
    return vi.fn((_url: string, init?: RequestInit) => {
        return new Promise<Response>((_resolve, reject) => {
            init?.signal?.addEventListener('abort', () => reject(init.signal?.reason));
        });
    });
}

describe('SearchController', () => {
    const fetchMock = vi.fn();

    beforeEach(() => {
        fetchMock.mockReset();
        vi.stubGlobal('fetch', fetchMock);
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.unstubAllGlobals();
    });

    it('starts in the idle state', () => {
        expect(new SearchController().getState()).toEqual({ status: 'idle' });
    });

    it('goes loading -> success and maps the countries', async () => {
        fetchMock.mockResolvedValue(jsonResponse([germany]));
        const controller = new SearchController();
        const statuses: string[] = [];
        controller.subscribe((state) => statuses.push(state.status));

        await controller.search('ger');

        expect(statuses).toEqual(['loading', 'success']);
        expect(controller.getState()).toMatchObject({
            status: 'success',
            query: 'ger',
            countries: [{ name: 'Germany', capital: 'Berlin' }],
        });
    });

    it('trims the query', async () => {
        fetchMock.mockResolvedValue(jsonResponse([germany]));

        await new SearchController().search('  ger  ');

        expect(fetchMock.mock.calls[0]?.[0]).toBe('https://countries.dev/name/ger');
    });

    it.each(['', '   '])('sends no request for empty input %j and stays idle', async (query) => {
        const controller = new SearchController();

        await controller.search(query);

        expect(fetchMock).not.toHaveBeenCalled();
        expect(controller.getState()).toEqual({ status: 'idle' });
    });

    it('clears results and aborts the in-flight request when the input becomes empty', async () => {
        const fetchHang = hangingFetch();
        vi.stubGlobal('fetch', fetchHang);
        const controller = new SearchController();

        const pending = controller.search('ger');
        await controller.search('');
        await pending;

        const init = fetchHang.mock.calls[0]?.[1] as RequestInit;
        expect(init.signal?.aborted).toBe(true);
        expect(controller.getState()).toEqual({ status: 'idle' });
    });

    it('shows "empty" for a 404', async () => {
        fetchMock.mockResolvedValue(new Response('nope', { status: 404 }));
        const controller = new SearchController();

        await controller.search('zzzz');

        expect(controller.getState()).toEqual({ status: 'empty', query: 'zzzz' });
    });

    it('shows an "http" error for a 500', async () => {
        fetchMock.mockResolvedValue(new Response('boom', { status: 500 }));
        const controller = new SearchController();

        await controller.search('ger');

        expect(controller.getState()).toEqual({ status: 'error', query: 'ger', kind: 'http' });
    });

    it('shows a "network" error when fetch fails', async () => {
        fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));
        const controller = new SearchController();

        await controller.search('ger');

        expect(controller.getState()).toEqual({ status: 'error', query: 'ger', kind: 'network' });
    });

    it('shows a "timeout" error when the request takes too long', async () => {
        vi.stubGlobal('fetch', hangingFetch());
        const controller = new SearchController({ timeoutMs: 10 });

        await controller.search('ger');

        expect(controller.getState()).toEqual({ status: 'error', query: 'ger', kind: 'timeout' });
    });

    it('retry() repeats the last query and recovers from an error', async () => {
        fetchMock.mockResolvedValueOnce(new Response('boom', { status: 500 }));
        fetchMock.mockResolvedValueOnce(jsonResponse([germany]));
        const controller = new SearchController();

        await controller.search('ger');
        expect(controller.getState().status).toBe('error');

        await controller.retry();

        expect(fetchMock).toHaveBeenCalledTimes(2);
        expect(fetchMock.mock.calls[1]?.[0]).toBe('https://countries.dev/name/ger');
        expect(controller.getState()).toMatchObject({ status: 'success', query: 'ger' });
    });

    it('unsubscribe stops notifications', async () => {
        fetchMock.mockResolvedValue(jsonResponse([germany]));
        const controller = new SearchController();
        const listener = vi.fn();

        const unsubscribe = controller.subscribe(listener);
        unsubscribe();
        await controller.search('ger');

        expect(listener).not.toHaveBeenCalled();
    });

    describe('input() debounce', () => {
        beforeEach(() => {
            vi.useFakeTimers();
        });

        it('sends one request for a burst of typing, with the last value', async () => {
            fetchMock.mockResolvedValue(jsonResponse([germany]));
            const controller = new SearchController({ debounceMs: 300 });

            controller.input('g');
            controller.input('ge');
            controller.input('ger');
            expect(fetchMock).not.toHaveBeenCalled();

            await vi.advanceTimersByTimeAsync(300);

            expect(fetchMock).toHaveBeenCalledTimes(1);
            expect(fetchMock.mock.calls[0]?.[0]).toBe('https://countries.dev/name/ger');
        });

        it('empty input clears results immediately and drops the pending search', async () => {
            const controller = new SearchController({ debounceMs: 300 });
            const states: SearchState[] = [];
            controller.subscribe((state) => states.push(state));

            controller.input('ger');
            controller.input('');
            await vi.advanceTimersByTimeAsync(1000);

            expect(fetchMock).not.toHaveBeenCalled();
            expect(controller.getState()).toEqual({ status: 'idle' });
        });
    });
});
