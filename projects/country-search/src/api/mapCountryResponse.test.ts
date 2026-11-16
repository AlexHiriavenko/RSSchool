import { describe, expect, it } from 'vitest';
import germanyFixture from './__fixtures__/germany.json';
import antarcticaFixture from './__fixtures__/antarctica.json';
import gerSearchFixture from './__fixtures__/ger-search.json';
import { mapCountryResponse } from './mapCountryResponse';
import type { RawCountry } from './types';

describe('mapCountryResponse', () => {
    it('returns an empty array for an empty response', () => {
        expect(mapCountryResponse([])).toEqual([]);
    });

    it('maps card fields of a full country (Germany)', () => {
        const [germany] = mapCountryResponse(germanyFixture as RawCountry[]);

        expect(germany).toMatchObject({
            name: 'Germany',
            flag: 'https://flagcdn.com/de.svg',
            capital: 'Berlin',
            region: 'Europe',
            population: 83240525,
            languages: ['German'],
        });
    });

    it('maps detail fields of a full country (Germany)', () => {
        const [germany] = mapCountryResponse(germanyFixture as RawCountry[]);

        expect(germany).toMatchObject({
            area: 357114,
            borders: ['AUT', 'BEL', 'CZE', 'DNK', 'FRA', 'LUX', 'NLD', 'POL', 'CHE'],
            currencies: ['Euro (EUR)'],
        });
    });

    it('builds a description from subregion and demonym', () => {
        const [germany] = mapCountryResponse(germanyFixture as RawCountry[]);

        expect(germany?.description).toBe('Germany is a German country in Central Europe.');
    });

    it('uses safe defaults for missing optional fields (Antarctica)', () => {
        const [antarctica] = mapCountryResponse(antarcticaFixture as RawCountry[]);

        expect(antarctica).toMatchObject({
            name: 'Antarctica',
            capital: null,
            region: 'Polar',
            population: 1000,
            languages: ['English', 'Russian'],
            borders: [],
            currencies: [],
        });
    });

    it('maps every item and keeps the order', () => {
        const countries = mapCountryResponse(gerSearchFixture as RawCountry[]);

        expect(countries.map((c) => c.name)).toEqual(
            (gerSearchFixture as RawCountry[]).map((c) => c.name),
        );
    });

    it('falls back to the png flag when svg is missing', () => {
        const raw: RawCountry = { name: 'X', flags: { png: 'https://example.com/x.png' } };

        expect(mapCountryResponse([raw])[0]?.flag).toBe('https://example.com/x.png');
    });

    it('returns a null flag when no flag is present', () => {
        expect(mapCountryResponse([{ name: 'X' }])[0]?.flag).toBeNull();
    });

    it('handles a minimal country that only has a name', () => {
        expect(mapCountryResponse([{ name: 'Nowhere' }])).toEqual([
            {
                name: 'Nowhere',
                flag: null,
                capital: null,
                region: null,
                population: null,
                languages: [],
                description: null,
                area: null,
                borders: [],
                currencies: [],
            },
        ]);
    });

    it('does not mutate the input', () => {
        const input = JSON.parse(JSON.stringify(germanyFixture)) as RawCountry[];
        const snapshot = JSON.parse(JSON.stringify(input)) as RawCountry[];

        mapCountryResponse(input);

        expect(input).toEqual(snapshot);
    });
});
