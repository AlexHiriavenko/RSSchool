import { describe, expect, it } from 'vitest';
import { HttpError, classifyError } from './errors';

describe('HttpError', () => {
    it('is an Error and keeps the status', () => {
        const error = new HttpError(500);

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(HttpError);
        expect(error.status).toBe(500);
    });

    it('has a name and a message containing the status', () => {
        const error = new HttpError(503);

        expect(error.name).toBe('HttpError');
        expect(error.message).toContain('503');
    });
});

describe('classifyError', () => {
    it('classifies a user cancellation as "aborted"', () => {
        const error = new DOMException('The operation was aborted.', 'AbortError');

        expect(classifyError(error)).toBe('aborted');
    });

    it('classifies a timeout as "timeout"', () => {
        const error = new DOMException('The operation timed out.', 'TimeoutError');

        expect(classifyError(error)).toBe('timeout');
    });

    it('does not mix up timeout and abort', () => {
        const timeout = new DOMException('t', 'TimeoutError');
        const abort = new DOMException('a', 'AbortError');

        expect(classifyError(timeout)).not.toBe(classifyError(abort));
    });

    it('classifies HttpError as "http"', () => {
        expect(classifyError(new HttpError(500))).toBe('http');
    });

    it('classifies fetch TypeError as "network"', () => {
        expect(classifyError(new TypeError('Failed to fetch'))).toBe('network');
    });

    it('classifies everything else as "unknown"', () => {
        expect(classifyError(new Error('boom'))).toBe('unknown');
        expect(classifyError('string')).toBe('unknown');
        expect(classifyError(undefined)).toBe('unknown');
    });
});
