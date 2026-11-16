import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { debounce } from './debounce';

describe('debounce', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('does not call fn before the delay has passed', () => {
        const fn = vi.fn();
        const debounced = debounce(fn, 300);

        debounced();
        vi.advanceTimersByTime(299);

        expect(fn).not.toHaveBeenCalled();
    });

    it('calls fn once after the delay has passed', () => {
        const fn = vi.fn();
        const debounced = debounce(fn, 300);

        debounced();
        vi.advanceTimersByTime(300);

        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('resets the timer on every call', () => {
        const fn = vi.fn();
        const debounced = debounce(fn, 300);

        debounced();
        vi.advanceTimersByTime(200);
        debounced();
        vi.advanceTimersByTime(200);
        expect(fn).not.toHaveBeenCalled();

        vi.advanceTimersByTime(100);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('calls fn only once for a burst of calls', () => {
        const fn = vi.fn();
        const debounced = debounce(fn, 300);

        debounced();
        debounced();
        debounced();
        vi.advanceTimersByTime(300);

        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('passes the arguments of the last call', () => {
        const fn = vi.fn();
        const debounced = debounce(fn, 300);

        debounced('a');
        debounced('ab');
        debounced('abc');
        vi.advanceTimersByTime(300);

        expect(fn).toHaveBeenCalledWith('abc');
    });

    it('can be called again after the previous call has fired', () => {
        const fn = vi.fn();
        const debounced = debounce(fn, 300);

        debounced('first');
        vi.advanceTimersByTime(300);
        debounced('second');
        vi.advanceTimersByTime(300);

        expect(fn).toHaveBeenCalledTimes(2);
        expect(fn).toHaveBeenLastCalledWith('second');
    });

    it('cancel() drops the pending call', () => {
        const fn = vi.fn();
        const debounced = debounce(fn, 300);

        debounced();
        debounced.cancel();
        vi.advanceTimersByTime(1000);

        expect(fn).not.toHaveBeenCalled();
    });
});
