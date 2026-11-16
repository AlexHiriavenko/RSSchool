export interface DebouncedFunction<Args extends unknown[]> {
    (...args: Args): void;
    cancel(): void;
}

/**
 * Delays calling `fn` until `delay` ms have passed since the last call.
 * Every new call resets the timer, so only the last call in a burst fires.
 */
export function debounce<Args extends unknown[]>(
    fn: (...args: Args) => void,
    delay: number,
): DebouncedFunction<Args> {
    let timerId: ReturnType<typeof setTimeout> | undefined;

    const debounced = (...args: Args): void => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            timerId = undefined;
            fn(...args);
        }, delay);
    };

    debounced.cancel = (): void => {
        clearTimeout(timerId);
        timerId = undefined;
    };

    return debounced;
}
