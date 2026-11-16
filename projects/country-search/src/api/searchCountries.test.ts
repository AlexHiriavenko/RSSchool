import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { HttpError } from './errors';
import { searchCountries } from './searchCountries';

const germany = { name: 'Germany', capital: 'Berlin', region: 'Europe', population: 83240525 };

function jsonResponse(body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
}

/** fetch mock that never resolves by itself and rejects with signal.reason on abort. */
function hangingFetch(): ReturnType<typeof vi.fn> {
    return vi.fn((_url: string, init?: RequestInit) => {
        return new Promise<Response>((_resolve, reject) => {
            init?.signal?.addEventListener('abort', () => reject(init.signal?.reason));
        });
    });
}

describe('searchCountries', () => {
    const fetchMock = vi.fn();

    beforeEach(() => {
        fetchMock.mockReset();
        vi.stubGlobal('fetch', fetchMock);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('requests countries.dev /name/{query}', async () => {
        fetchMock.mockResolvedValue(jsonResponse([germany]));

        await searchCountries('ger', new AbortController().signal);

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock.mock.calls[0]?.[0]).toBe('https://countries.dev/name/ger');
    });

    it('encodes the query in the URL', async () => {
        fetchMock.mockResolvedValue(jsonResponse([]));

        await searchCountries('côte d/ivoire?', new AbortController().signal);

        expect(fetchMock.mock.calls[0]?.[0]).toBe(
            `https://countries.dev/name/${encodeURIComponent('côte d/ivoire?')}`,
        );
    });

    it('returns parsed JSON on success', async () => {
        fetchMock.mockResolvedValue(jsonResponse([germany]));

        const result = await searchCountries('ger', new AbortController().signal);

        expect(result).toEqual([germany]);
    });

    it('treats 404 as an empty result, not as an error', async () => {
        fetchMock.mockResolvedValue(new Response('not found', { status: 404 }));

        await expect(searchCountries('zzzz', new AbortController().signal)).resolves.toEqual([]);
    });

    it.each([400, 429, 500, 503])('throws HttpError with status %i', async (status) => {
        fetchMock.mockResolvedValue(new Response('error', { status }));

        const promise = searchCountries('ger', new AbortController().signal);

        await expect(promise).rejects.toBeInstanceOf(HttpError);
        await expect(promise).rejects.toMatchObject({ status });
    });

    it('passes an abort signal to fetch', async () => {
        fetchMock.mockResolvedValue(jsonResponse([]));

        await searchCountries('ger', new AbortController().signal);

        const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
        expect(init.signal).toBeInstanceOf(AbortSignal);
    });

    it('aborts the underlying fetch when the caller signal is aborted', async () => {
        const fetchHang = hangingFetch();
        vi.stubGlobal('fetch', fetchHang);
        const controller = new AbortController();

        const promise = searchCountries('ger', controller.signal);
        controller.abort();

        await expect(promise).rejects.toMatchObject({ name: 'AbortError' });
        const init = fetchHang.mock.calls[0]?.[1] as RequestInit;
        expect(init.signal?.aborted).toBe(true);
    });

    it('rejects with AbortError when the signal is already aborted', async () => {
        vi.stubGlobal('fetch', hangingFetch());
        const controller = new AbortController();
        controller.abort();

        await expect(searchCountries('ger', controller.signal)).rejects.toMatchObject({
            name: 'AbortError',
        });
    });

    it('rejects with TimeoutError when the request takes too long', async () => {
        vi.stubGlobal('fetch', hangingFetch());

        const promise = searchCountries('ger', new AbortController().signal, { timeoutMs: 10 });

        await expect(promise).rejects.toMatchObject({ name: 'TimeoutError' });
    });

    it('does not report a timeout as a user abort', async () => {
        vi.stubGlobal('fetch', hangingFetch());

        const promise = searchCountries('ger', new AbortController().signal, { timeoutMs: 10 });

        await expect(promise).rejects.not.toMatchObject({ name: 'AbortError' });
    });
});
