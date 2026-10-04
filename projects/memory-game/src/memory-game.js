import { EMOJIS, MISMATCH_DELAY, WIN_MODAL_DELAY } from './config.js';
import { FLIP_RESULT, Game } from './core/game.js';
import { addResult, loadResults } from './core/leaderboard.js';
import { createBoard } from './ui/board.js';
import { createHeader } from './ui/header.js';
import { openLeaderboardModal } from './ui/leaderboard-modal.js';
import { createStats } from './ui/stats.js';
import { openWinModal } from './ui/win-modal.js';
import { el } from './utils/dom.js';

export const memoryGame = {
  init() {
    const game = new Game(EMOJIS);
    let mismatchTimer = null;
    let winTimer = null;

    const header = createHeader({ onNewGame: startNewGame, onLeaderboard: showLeaderboard });
    const board = createBoard({ onCardClick: handleCardClick });
    const stats = createStats({ totalPairs: game.totalPairs });

    function renderGame() {
      board.render(game.cards);
      board.setLocked(game.isLocked);
      stats.render(game);
    }

    function cancelTimers() {
      clearTimeout(mismatchTimer);
      clearTimeout(winTimer);
      mismatchTimer = null;
      winTimer = null;
    }

    function startNewGame() {
      cancelTimers();
      game.start();
      renderGame();
    }

    function showLeaderboard() {
      openLeaderboardModal(loadResults());
    }

    function handleCardClick(cardId) {
      const result = game.flip(cardId);
      if (result === FLIP_RESULT.IGNORED) return;

      renderGame();

      if (result === FLIP_RESULT.WIN) {
        addResult(game.moves);
        winTimer = setTimeout(() => {
          winTimer = null;
          openWinModal({ moves: game.moves, onNewGame: startNewGame });
        }, WIN_MODAL_DELAY);
      }

      if (result === FLIP_RESULT.MISMATCH) {
        mismatchTimer = setTimeout(() => {
          mismatchTimer = null;
          game.resolveMismatch();
          renderGame();
        }, MISMATCH_DELAY);
      }
    }

    renderGame();
    document.body.append(el('div', { class: 'app' }, header, stats.element, board.element));
  },
};
