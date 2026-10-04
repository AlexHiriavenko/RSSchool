import { el } from '../utils/dom.js';

let overlay = null;
let previousFocus = null;
let onCloseCallback = null;

function handleKeydown(event) {
  if (event.key === 'Escape') closeModal();
}

function handleOverlayClick(event) {
  if (event.target === overlay) closeModal();
}

function setPageInert(isInert) {
  [...document.body.children].forEach((child) => {
    if (child !== overlay) child.inert = isInert;
  });
}

function createOverlay(title, content) {
  const titleElement = el('h2', { class: 'modal__title', text: title, attrs: { id: 'modal-title' } });
  const dialog = el(
    'div',
    { class: 'modal', attrs: { role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'modal-title', tabindex: '-1' } },
    titleElement,
    content,
  );

  return el('div', { class: 'modal-overlay', on: { click: handleOverlayClick } }, dialog);
}

export function isModalOpen() {
  return overlay !== null;
}

/**
 * Общий компонент модального окна: оболочка, открытие и закрытие.
 * Содержимое (Node или массив Node) передаётся снаружи.
 */
export function openModal({ title, content, onClose }) {
  if (isModalOpen()) closeModal();

  previousFocus = document.activeElement;
  onCloseCallback = onClose ?? null;
  overlay = createOverlay(title, content);

  document.body.append(overlay);
  document.body.classList.add('no-scroll');
  setPageInert(true);
  document.addEventListener('keydown', handleKeydown);
  overlay.firstElementChild.focus();
}

export function closeModal() {
  if (!isModalOpen()) return;

  const callback = onCloseCallback;

  document.removeEventListener('keydown', handleKeydown);
  setPageInert(false);
  document.body.classList.remove('no-scroll');
  overlay.remove();
  overlay = null;
  onCloseCallback = null;

  previousFocus?.focus?.();
  previousFocus = null;
  callback?.();
}
