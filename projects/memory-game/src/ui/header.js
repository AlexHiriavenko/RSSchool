import { el } from '../utils/dom.js';

function createButton(text, onClick) {
  return el('button', { class: 'btn', text, attrs: { type: 'button' }, on: { click: onClick } });
}

/** Хедер с кнопками «Новая игра» и «Таблица лидеров». */
export function createHeader({ onNewGame, onLeaderboard }) {
  return el(
    'header',
    { class: 'header' },
    el('h1', { class: 'header__title', text: 'Memory Game' }),
    el(
      'div',
      { class: 'header__actions' },
      createButton('Новая игра', onNewGame),
      createButton('Таблица лидеров', onLeaderboard),
    ),
  );
}
