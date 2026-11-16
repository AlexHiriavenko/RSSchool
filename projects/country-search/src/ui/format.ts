const FALLBACK = '—';

export function formatPopulation(value: number | null): string {
    return value === null ? FALLBACK : value.toLocaleString('en-US');
}

export function formatArea(value: number | null): string {
    return value === null ? FALLBACK : `${value.toLocaleString('en-US')} km²`;
}

export function formatList(values: string[], emptyText = FALLBACK): string {
    return values.length > 0 ? values.join(', ') : emptyText;
}

export function formatText(value: string | null): string {
    return value ?? FALLBACK;
}
