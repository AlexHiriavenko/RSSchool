import { el } from '../utils/dom.js';

const CARD_BACK = '?';

function createCard(card) {
  return el(
    'button',
    { class: 'card', attrs: { type: 'button', 'data-id': card.id } },
    el(
      'div',
      { class: 'card__inner' },
      el('div', { class: 'card__face card__face--back', text: CARD_BACK, attrs: { 'aria-hidden': 'true' } }),
      el('div', { class: 'card__face card__face--front', text: card.symbol, attrs: { 'aria-hidden': 'true' } }),
    ),
  );
}

function updateCard(cardElement, card) {
  const isOpen = card.isFlipped || card.isMatched;

  cardElement.classList.toggle('card--open', isOpen);
  cardElement.classList.toggle('card--matched', card.isMatched);
  cardElement.setAttribute('aria-label', isOpen ? card.symbol : 'Закрытая карточка');
}

/**
 * Игровое поле. Клик обрабатывается делегированием на контейнере.
 * onCardClick получает id карточки.
 */
export function createBoard({ onCardClick }) {
  let layoutKey = '';

  const element = el('div', {
    class: 'board',
    on: {
      click: (event) => {
        const cardElement = event.target.closest('.card');
        if (cardElement) onCardClick(Number(cardElement.dataset.id));
      },
    },
  });

  /**
   * Если раскладка не изменилась, обновляет классы существующих карточек
   * (чтобы сработала CSS-анимация переворота), иначе пересоздаёт поле.
   */
  function render(cards) {
    const nextKey = cards.map(({ id, symbol }) => `${id}:${symbol}`).join('|');

    if (nextKey !== layoutKey) {
      layoutKey = nextKey;
      element.replaceChildren(...cards.map(createCard));
    }

    cards.forEach((card, index) => updateCard(element.children[index], card));
  }

  function setLocked(isLocked) {
    element.classList.toggle('board--locked', isLocked);
  }

  return { element, render, setLocked };
}
