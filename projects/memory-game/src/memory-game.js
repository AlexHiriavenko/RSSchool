import { EMOJIS } from './config.js';
import { createDeck } from './core/deck.js';
import { createBoard } from './ui/board.js';
import { el } from './utils/dom.js';

export const memoryGame = {
  init() {
    const cards = createDeck(EMOJIS);
    const board = createBoard({ onCardClick: () => {} });

    board.render(cards);
    document.body.append(
      el('div', { class: 'app' }, el('h1', { class: 'app__title', text: 'Memory Game' }), board.element),
    );
  },
};
