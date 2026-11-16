const FALLBACK = '—';
export function formatPopulation(value) {
    return value === null ? FALLBACK : value.toLocaleString('en-US');
}
export function formatArea(value) {
    return value === null ? FALLBACK : `${value.toLocaleString('en-US')} km²`;
}
export function formatList(values, emptyText = FALLBACK) {
    return values.length > 0 ? values.join(', ') : emptyText;
}
export function formatText(value) {
    return value ?? FALLBACK;
}
//# sourceMappingURL=format.js.map