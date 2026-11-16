type Child = Node | string | null | undefined;

interface ElementProps {
    className?: string;
    text?: string;
    attrs?: Record<string, string>;
    on?: { [K in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[K]) => void };
}

/**
 * Tiny element factory. Content is always set through textContent / text nodes,
 * never through innerHTML, so API data can not inject markup.
 */
export function el<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    { className, text, attrs, on }: ElementProps = {},
    ...children: Child[]
): HTMLElementTagNameMap[K] {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    for (const [name, value] of Object.entries(attrs ?? {})) element.setAttribute(name, value);
    for (const [type, handler] of Object.entries(on ?? {})) {
        element.addEventListener(type, handler as EventListener);
    }
    for (const child of children) {
        if (child !== null && child !== undefined) element.append(child);
    }
    return element;
}
