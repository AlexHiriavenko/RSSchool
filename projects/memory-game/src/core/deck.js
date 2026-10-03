import { shuffle } from '../utils/shuffle.js';

/** Создаёт перемешанную колоду: каждый символ встречается дважды. */
export function createDeck(symbols) {
  const cards = symbols.flatMap((symbol) => [symbol, symbol]).map((symbol, index) => ({
    id: index,
    symbol,
    isFlipped: false,
    isMatched: false,
  }));

  return shuffle(cards);
}
