import { createDeck } from './deck.js';

export const FLIP_RESULT = {
  IGNORED: 'ignored',
  OPENED: 'opened',
  MATCH: 'match',
  MISMATCH: 'mismatch',
  WIN: 'win',
};

/** Состояние и правила игры. Ничего не знает о DOM и таймерах. */
export class Game {
  constructor(symbols) {
    this.symbols = symbols;
    this.start();
  }

  get totalPairs() {
    return this.symbols.length;
  }

  start() {
    this.cards = createDeck(this.symbols);
    this.moves = 0;
    this.matchedPairs = 0;
    this.firstCard = null;
    this.secondCard = null;
    this.isLocked = false;
    this.isFinished = false;
  }

  flip(cardId) {
    const card = this.cards.find(({ id }) => id === cardId);

    if (!card || this.isLocked || this.isFinished || card.isFlipped || card.isMatched) {
      return FLIP_RESULT.IGNORED;
    }

    card.isFlipped = true;

    if (!this.firstCard) {
      this.firstCard = card;
      return FLIP_RESULT.OPENED;
    }

    this.moves += 1;
    return this.firstCard.symbol === card.symbol ? this.#matchWith(card) : this.#mismatchWith(card);
  }

  /** Закрывает несовпавшую пару и снимает блокировку. */
  resolveMismatch() {
    if (!this.secondCard) return;

    this.firstCard.isFlipped = false;
    this.secondCard.isFlipped = false;
    this.firstCard = null;
    this.secondCard = null;
    this.isLocked = false;
  }

  #matchWith(card) {
    [this.firstCard, card].forEach((matched) => {
      matched.isFlipped = false;
      matched.isMatched = true;
    });
    this.firstCard = null;
    this.matchedPairs += 1;

    if (this.matchedPairs === this.totalPairs) {
      this.isFinished = true;
      return FLIP_RESULT.WIN;
    }

    return FLIP_RESULT.MATCH;
  }

  #mismatchWith(card) {
    this.secondCard = card;
    this.isLocked = true;
    return FLIP_RESULT.MISMATCH;
  }
}
