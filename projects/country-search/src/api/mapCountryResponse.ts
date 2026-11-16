import type { RawCountry } from './types.js';

export interface Country {
    name: string;
    flag: string | null;
    capital: string | null;
    region: string | null;
    population: number | null;
    languages: string[];
    description: string | null;
    area: number | null;
    borders: string[];
    currencies: string[];
}

function buildDescription(raw: RawCountry): string | null {
    const place = raw.subregion ?? raw.region;
    if (!place) return null;
    const demonym = raw.demonym ? `${raw.demonym} ` : '';
    return `${raw.name} is a ${demonym}country in ${place}.`;
}

function mapCountry(raw: RawCountry): Country {
    return {
        name: raw.name,
        flag: raw.flags?.svg ?? raw.flags?.png ?? null,
        capital: raw.capital ?? null,
        region: raw.region ?? null,
        population: raw.population ?? null,
        languages: (raw.languages ?? []).map((language) => language.name),
        description: buildDescription(raw),
        area: raw.area ?? null,
        borders: [...(raw.borders ?? [])],
        currencies: (raw.currencies ?? []).map(({ name, code }) => `${name} (${code})`),
    };
}

/** Pure mapper from the API shape to the app model. O(n) for n countries. */
export function mapCountryResponse(raw: RawCountry[]): Country[] {
    return raw.map(mapCountry);
}
