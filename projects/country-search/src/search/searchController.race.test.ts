import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SearchController } from './searchController';

interface PendingRequest {
    url: string;
    signal: AbortSignal;
    respond: (body: unknown, status?: number) => void;
}

/**
 * fetch mock where the test decides when (and in which order) requests resolve.
 * With honorAbort = true it behaves like real fetch: it rejects with signal.reason on abort.
 */
function mockControlledFetch(honorAbort = true) {
    const requests: PendingRequest[] = [];

    const fetchMock = vi.fn((url: string, init?: RequestInit) => {
        return new Promise<Response>((resolve, reject) => {
            const signal = init?.signal as AbortSignal;
            requests.push({
                url,
                signal,
                respond: (body, status = 200) =>
                    resolve(new Response(JSON.stringify(body), { status })),
            });
            if (honorAbort) {
                signal.addEventListener('abort', () => reject(signal.reason));
            }
        });
    });

    vi.stubGlobal('fetch', fetchMock);
    return requests;
}

const germany = { name: 'Germany', capital: 'Berlin', region: 'Europe', population: 83240525 };
const georgia = { name: 'Georgia', capital: 'Tbilisi', region: 'Asia', population: 3700000 };
const algeria = { name: 'Algeria', capital: 'Algiers', region: 'Africa', population: 44700000 };

describe('SearchController: race conditions', () => {
    let controller: SearchController;

    beforeEach(() => {
        controller = new SearchController();
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('aborts the previous request when a new search starts', () => {
        const requests = mockControlledFetch();

        void controller.search('g');
        expect(requests[0]?.signal.aborted).toBe(false);

        void controller.search('ge');

        expect(requests[0]?.signal.aborted).toBe(true);
        expect(requests[1]?.signal.aborted).toBe(false);
    });

    it('keeps the latest result when the earlier request resolves after the later one', async () => {
        const requests = mockControlledFetch();

        const first = controller.search('g');
        const second = controller.search('ge');

        requests[1]?.respond([germany]);
        await second;
        requests[0]?.respond([georgia, algeria]); // late response of the stale request
        await first;

        const state = controller.getState();
        expect(state.status).toBe('success');
        expect(state).toMatchObject({ query: 'ge' });
        expect(state.status === 'success' && state.countries.map((c) => c.name)).toEqual([
            'Germany',
        ]);
    });

    it('does not show an error when the previous request is aborted by the user', async () => {
        const requests = mockControlledFetch();

        const first = controller.search('g');
        const second = controller.search('ge');
        requests[1]?.respond([germany]);
        await Promise.all([first, second]);

        expect(controller.getState().status).toBe('success');
    });

    it('never publishes the state of a stale request, even in between', async () => {
        const requests = mockControlledFetch();
        const seen: string[] = [];
        controller.subscribe((state) => {
            if (state.status === 'success') seen.push(state.query);
            if (state.status === 'error') seen.push(`error:${state.query}`);
        });

        const first = controller.search('g');
        const second = controller.search('ge');
        requests[1]?.respond([germany]);
        await second;
        requests[0]?.respond([georgia]);
        await first;

        expect(seen).toEqual(['ge']);
    });

    it('ignores a stale response even if fetch does not honor abort', async () => {
        const requests = mockControlledFetch(false);

        const first = controller.search('g');
        const second = controller.search('ge');

        requests[1]?.respond([germany]);
        await second;
        requests[0]?.respond([georgia]);
        await first;

        expect(controller.getState()).toMatchObject({ status: 'success', query: 'ge' });
    });

    it('ignores a stale error when a newer request has already succeeded', async () => {
        const requests = mockControlledFetch(false);

        const first = controller.search('g');
        const second = controller.search('ge');

        requests[1]?.respond([germany]);
        await second;
        requests[0]?.respond({ message: 'boom' }, 500);
        await first;

        expect(controller.getState()).toMatchObject({ status: 'success', query: 'ge' });
    });

    it('handles three overlapping requests resolving in reverse order', async () => {
        const requests = mockControlledFetch(false);

        const p1 = controller.search('g');
        const p2 = controller.search('ge');
        const p3 = controller.search('ger');

        requests[2]?.respond([germany]);
        await p3;
        requests[1]?.respond([georgia]);
        await p2;
        requests[0]?.respond([algeria]);
        await p1;

        expect(controller.getState()).toMatchObject({ status: 'success', query: 'ger' });
    });
});
