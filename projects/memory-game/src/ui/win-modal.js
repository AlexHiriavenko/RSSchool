import { el } from '../utils/dom.js';
import { closeModal, openModal } from './modal.js';

function createButton(text, onClick) {
  return el('button', { class: 'btn', text, attrs: { type: 'button' }, on: { click: onClick } });
}

export function openWinModal({ moves, onNewGame }) {
  openModal({
    title: 'Победа! 🎉',
    content: [
      el('p', { class: 'modal__text', text: `Вы нашли все пары! Ходов: ${moves}` }),
      el(
        'div',
        { class: 'modal__actions' },
        createButton('Новая игра', () => {
          closeModal();
          onNewGame();
        }),
        createButton('Закрыть', closeModal),
      ),
    ],
  });
}
