import { HttpError } from './errors.js';
import type { RawCountry } from './types.js';

export const API_BASE_URL = 'https://countries.dev';
export const DEFAULT_TIMEOUT_MS = 8000;

export interface SearchOptions {
    timeoutMs?: number;
}

/**
 * Searches countries by name.
 * - 404 means "nothing found" and resolves to [].
 * - Other non-ok statuses throw HttpError.
 * - Caller cancellation rejects with AbortError, a timeout with TimeoutError.
 */
export async function searchCountries(
    query: string,
    signal: AbortSignal,
    { timeoutMs = DEFAULT_TIMEOUT_MS }: SearchOptions = {},
): Promise<RawCountry[]> {
    // Fail fast: no request if the caller has already cancelled.
    signal.throwIfAborted();

    const combined = AbortSignal.any([signal, AbortSignal.timeout(timeoutMs)]);

    const response = await fetch(`${API_BASE_URL}/name/${encodeURIComponent(query)}`, {
        signal: combined,
    });

    if (response.status === 404) return [];
    if (!response.ok) throw new HttpError(response.status);

    return (await response.json()) as RawCountry[];
}
