import type { Country } from '../api/mapCountryResponse.js';
import { el } from './dom.js';
import { formatList, formatPopulation, formatText } from './format.js';

export function createFlag(country: Country, className: string): HTMLElement {
    if (!country.flag) {
        return el('div', { className: `${className} flag-placeholder`, text: '🏳️' });
    }
    return el('img', {
        className,
        attrs: { src: country.flag, alt: `Flag of ${country.name}`, loading: 'lazy' },
    });
}

export function createRow(label: string, value: string): HTMLElement {
    return el('div', { className: 'row' }, el('dt', { text: label }), el('dd', { text: value }));
}

export function createCountryCard(
    country: Country,
    onSelect: (country: Country) => void,
): HTMLElement {
    return el(
        'li',
        { className: 'card-item' },
        el(
            'button',
            {
                className: 'card',
                attrs: { type: 'button', 'aria-label': `Show details for ${country.name}` },
                on: { click: () => onSelect(country) },
            },
            createFlag(country, 'card-flag'),
            el('h2', { className: 'card-title', text: country.name }),
            el(
                'dl',
                { className: 'card-info' },
                createRow('Capital', formatText(country.capital)),
                createRow('Region', formatText(country.region)),
                createRow('Population', formatPopulation(country.population)),
                createRow('Languages', formatList(country.languages)),
            ),
        ),
    );
}
