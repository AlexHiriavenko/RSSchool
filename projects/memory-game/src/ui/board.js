import { el } from '../utils/dom.js';

const CARD_BACK = '?';

function createCard(card) {
  const isOpen = card.isFlipped || card.isMatched;

  return el('button', {
    class: `card${isOpen ? ' card--open' : ''}${card.isMatched ? ' card--matched' : ''}`,
    text: isOpen ? card.symbol : CARD_BACK,
    attrs: {
      type: 'button',
      'data-id': card.id,
      'aria-label': isOpen ? card.symbol : 'Закрытая карточка',
    },
  });
}

/**
 * Игровое поле. Клик обрабатывается делегированием на контейнере.
 * onCardClick получает id карточки.
 */
export function createBoard({ onCardClick }) {
  const element = el('div', {
    class: 'board',
    on: {
      click: (event) => {
        const cardElement = event.target.closest('.card');
        if (cardElement) onCardClick(Number(cardElement.dataset.id));
      },
    },
  });

  function render(cards) {
    element.replaceChildren(...cards.map(createCard));
  }

  return { element, render };
}
