import { el } from '../utils/dom.js';

function createStat(label) {
  const value = el('span', { class: 'stats__value', text: '0' });
  const item = el('div', { class: 'stats__item' }, el('span', { class: 'stats__label', text: label }), value);
  return { item, value };
}

/** Счётчики ходов и найденных пар. */
export function createStats({ totalPairs }) {
  const moves = createStat('Ходы');
  const pairs = createStat('Пары');
  const element = el('div', { class: 'stats', attrs: { 'aria-live': 'polite' } }, moves.item, pairs.item);

  function render({ moves: movesCount, matchedPairs }) {
    moves.value.textContent = String(movesCount);
    pairs.value.textContent = `${matchedPairs} из ${totalPairs}`;
  }

  return { element, render };
}
