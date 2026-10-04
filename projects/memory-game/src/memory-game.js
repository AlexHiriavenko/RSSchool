import { EMOJIS, MISMATCH_DELAY } from './config.js';
import { FLIP_RESULT, Game } from './core/game.js';
import { createBoard } from './ui/board.js';
import { el } from './utils/dom.js';

export const memoryGame = {
  init() {
    const game = new Game(EMOJIS);
    let mismatchTimer = null;

    const board = createBoard({ onCardClick: handleCardClick });

    function handleCardClick(cardId) {
      const result = game.flip(cardId);
      if (result === FLIP_RESULT.IGNORED) return;

      board.render(game.cards);
      board.setLocked(game.isLocked);

      if (result === FLIP_RESULT.MISMATCH) {
        mismatchTimer = setTimeout(() => {
          mismatchTimer = null;
          game.resolveMismatch();
          board.render(game.cards);
          board.setLocked(game.isLocked);
        }, MISMATCH_DELAY);
      }
    }

    board.render(game.cards);
    document.body.append(
      el('div', { class: 'app' }, el('h1', { class: 'app__title', text: 'Memory Game' }), board.element),
    );
  },
};
