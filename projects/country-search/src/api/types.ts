export interface RawLanguage {
    name: string;
    iso639_1?: string;
    nativeName?: string;
}

export interface RawCurrency {
    code: string;
    name: string;
    symbol?: string;
}

/** Country as returned by countries.dev (only the fields the app uses). */
export interface RawCountry {
    name: string;
    flag?: string;
    flags?: { png?: string; svg?: string };
    capital?: string;
    region?: string;
    subregion?: string;
    demonym?: string;
    population?: number;
    area?: number;
    borders?: string[];
    languages?: RawLanguage[];
    currencies?: RawCurrency[];
}
