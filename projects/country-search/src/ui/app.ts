import type { ErrorKind } from '../api/errors.js';
import type { SearchController, SearchState } from '../search/searchController.js';
import { createCountryCard } from './countryCard.js';
import { CountryDetails } from './countryDetails.js';
import { el } from './dom.js';

const ERROR_MESSAGES: Record<Exclude<ErrorKind, 'aborted'>, string> = {
    http: 'The server returned an error. Please try again.',
    network: 'Network error. Check your connection and try again.',
    timeout: 'The request took too long. Please try again.',
    unknown: 'Something went wrong. Please try again.',
};

export function mountApp(root: HTMLElement, controller: SearchController): void {
    const details = new CountryDetails();

    const input = el('input', {
        className: 'search-input',
        attrs: {
            type: 'search',
            id: 'search',
            placeholder: 'Start typing a country name…',
            autocomplete: 'off',
            'aria-label': 'Search countries by name',
        },
        on: { input: () => controller.input(input.value) },
    });
    const status = el('div', {
        className: 'status',
        attrs: { role: 'status', 'aria-live': 'polite' },
    });
    const results = el('ul', { className: 'results' });

    root.append(
        el(
            'main',
            { className: 'app' },
            el('h1', { className: 'title', text: 'Country Search' }),
            el('div', { className: 'search' }, input),
            status,
            results,
        ),
    );

    function renderState(state: SearchState): void {
        results.replaceChildren();
        status.replaceChildren();
        status.className = `status status-${state.status}`;

        switch (state.status) {
            case 'idle':
                status.textContent = 'Type a country name to start the search.';
                break;
            case 'loading':
                status.append(
                    el('span', { className: 'spinner', attrs: { 'aria-hidden': 'true' } }),
                    el('span', { text: `Searching for "${state.query}"…` }),
                );
                break;
            case 'empty':
                status.textContent = `No countries found for "${state.query}". Try another name.`;
                break;
            case 'error':
                status.append(
                    el('p', { className: 'error-text', text: ERROR_MESSAGES[state.kind] }),
                    el('button', {
                        className: 'retry',
                        text: 'Retry',
                        attrs: { type: 'button' },
                        on: { click: () => void controller.retry() },
                    }),
                );
                break;
            case 'success':
                results.append(
                    ...state.countries.map((country) =>
                        createCountryCard(country, (selected) => details.open(selected)),
                    ),
                );
                break;
        }
    }

    controller.subscribe(renderState);
    renderState(controller.getState());
    input.focus();
}
