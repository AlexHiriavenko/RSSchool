export class HttpError extends Error {
    status;
    constructor(status) {
        super(`Request failed with status ${status}`);
        this.name = 'HttpError';
        this.status = status;
    }
}
/**
 * Maps a thrown value to a kind the UI can react to.
 * "aborted" is a deliberate cancellation and must never be shown as an error.
 */
export function classifyError(error) {
    if (error instanceof HttpError)
        return 'http';
    if (error instanceof DOMException) {
        if (error.name === 'AbortError')
            return 'aborted';
        if (error.name === 'TimeoutError')
            return 'timeout';
    }
    // fetch rejects with TypeError on network failures
    if (error instanceof TypeError)
        return 'network';
    return 'unknown';
}
//# sourceMappingURL=errors.js.map