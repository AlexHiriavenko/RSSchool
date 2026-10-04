import { EMOJIS, MISMATCH_DELAY } from './config.js';
import { FLIP_RESULT, Game } from './core/game.js';
import { createBoard } from './ui/board.js';
import { createStats } from './ui/stats.js';
import { el } from './utils/dom.js';

export const memoryGame = {
  init() {
    const game = new Game(EMOJIS);
    let mismatchTimer = null;

    const board = createBoard({ onCardClick: handleCardClick });
    const stats = createStats({ totalPairs: game.totalPairs });

    function renderGame() {
      board.render(game.cards);
      board.setLocked(game.isLocked);
      stats.render(game);
    }

    function handleCardClick(cardId) {
      const result = game.flip(cardId);
      if (result === FLIP_RESULT.IGNORED) return;

      renderGame();

      if (result === FLIP_RESULT.MISMATCH) {
        mismatchTimer = setTimeout(() => {
          mismatchTimer = null;
          game.resolveMismatch();
          renderGame();
        }, MISMATCH_DELAY);
      }
    }

    renderGame();
    document.body.append(
      el(
        'div',
        { class: 'app' },
        el('h1', { class: 'app__title', text: 'Memory Game' }),
        stats.element,
        board.element,
      ),
    );
  },
};
