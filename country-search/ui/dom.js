/**
 * Tiny element factory. Content is always set through textContent / text nodes,
 * never through innerHTML, so API data can not inject markup.
 */
export function el(tag, { className, text, attrs, on } = {}, ...children) {
    const element = document.createElement(tag);
    if (className)
        element.className = className;
    if (text !== undefined)
        element.textContent = text;
    for (const [name, value] of Object.entries(attrs ?? {}))
        element.setAttribute(name, value);
    for (const [type, handler] of Object.entries(on ?? {})) {
        element.addEventListener(type, handler);
    }
    for (const child of children) {
        if (child !== null && child !== undefined)
            element.append(child);
    }
    return element;
}
//# sourceMappingURL=dom.js.map