import { createFlag, createRow } from './countryCard.js';
import { el } from './dom.js';
import { formatArea, formatList, formatPopulation, formatText } from './format.js';
/** Modal with the full information about one country. Native <dialog> handles Esc and focus. */
export class CountryDetails {
    dialog = el('dialog', {
        className: 'details',
        attrs: { 'aria-labelledby': 'details-title' },
    });
    constructor() {
        // a click on the backdrop targets the dialog element itself
        this.dialog.addEventListener('click', (event) => {
            if (event.target === this.dialog)
                this.dialog.close();
        });
        document.body.append(this.dialog);
    }
    open(country) {
        const closeButton = el('button', {
            className: 'details-close',
            text: '×',
            attrs: { type: 'button', 'aria-label': 'Close details' },
            on: { click: () => this.dialog.close() },
        });
        this.dialog.replaceChildren(closeButton, createFlag(country, 'details-flag'), el('h2', {
            className: 'details-title',
            text: country.name,
            attrs: { id: 'details-title' },
        }), el('p', { className: 'details-description', text: formatText(country.description) }), el('dl', { className: 'details-info' }, createRow('Capital', formatText(country.capital)), createRow('Region', formatText(country.region)), createRow('Population', formatPopulation(country.population)), createRow('Area', formatArea(country.area)), createRow('Borders', formatList(country.borders, 'No land borders')), createRow('Languages', formatList(country.languages)), createRow('Currency', formatList(country.currencies))));
        if (!this.dialog.open)
            this.dialog.showModal();
    }
}
//# sourceMappingURL=countryDetails.js.map