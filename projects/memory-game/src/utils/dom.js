/**
 * Обёртка над document.createElement.
 * el('button', { class: 'btn', text: 'OK', attrs: { type: 'button' }, on: { click: fn } }, ...children)
 */
export function el(tag, options = {}, ...children) {
  const { class: className, text, attrs = {}, on = {} } = options;
  const element = document.createElement(tag);

  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;

  Object.entries(attrs).forEach(([name, value]) => element.setAttribute(name, value));
  Object.entries(on).forEach(([event, handler]) => element.addEventListener(event, handler));

  element.append(...children.flat().filter(Boolean));
  return element;
}
