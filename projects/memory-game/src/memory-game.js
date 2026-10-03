import { el } from './utils/dom.js';

export const memoryGame = {
  init() {
    const app = el('div', { class: 'app' }, el('h1', { class: 'app__title', text: 'Memory Game' }));
    document.body.append(app);
  },
};
