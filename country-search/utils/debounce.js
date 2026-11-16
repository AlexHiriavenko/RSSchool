/**
 * Delays calling `fn` until `delay` ms have passed since the last call.
 * Every new call resets the timer, so only the last call in a burst fires.
 */
export function debounce(fn, delay) {
    let timerId;
    const debounced = (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            timerId = undefined;
            fn(...args);
        }, delay);
    };
    debounced.cancel = () => {
        clearTimeout(timerId);
        timerId = undefined;
    };
    return debounced;
}
//# sourceMappingURL=debounce.js.map