import { formatDate } from '../utils/format-date.js';
import { el } from '../utils/dom.js';
import { closeModal, openModal } from './modal.js';

function createRow(result, index) {
  return el(
    'tr',
    {},
    el('td', { text: String(index + 1) }),
    el('td', { text: String(result.moves) }),
    el('td', { text: formatDate(result.playedAt) }),
  );
}

function createTable(results) {
  return el(
    'table',
    { class: 'leaderboard' },
    el('thead', {}, el('tr', {}, el('th', { text: 'Место' }), el('th', { text: 'Ходы' }), el('th', { text: 'Дата' }))),
    el('tbody', {}, results.map(createRow)),
  );
}

export function openLeaderboardModal(results) {
  const body =
    results.length > 0 ? createTable(results) : el('p', { class: 'leaderboard__empty', text: 'Пока нет результатов' });

  const closeButton = el('button', {
    class: 'btn',
    text: 'Закрыть',
    attrs: { type: 'button' },
    on: { click: closeModal },
  });

  openModal({
    title: 'Таблица лидеров',
    content: [body, el('div', { class: 'modal__actions' }, closeButton)],
  });
}
