class DOM_Manipulator {
    protected setElementTextContent(parent: ParentNode, selector: string, text: string) {
        const element = parent.querySelector<HTMLElement>(selector);
        if (element) {
            element.textContent = text;
        }
    }

    protected setElementAttribute(parent: ParentNode, selector: string, attrKey: string, attrValue: string): void {
        const element = parent.querySelector<HTMLElement>(selector);
        if (element) {
            element.setAttribute(attrKey, attrValue);
        }
    }

    protected setElementStyle(parent: ParentNode, selector: string, styleProp: string, styleValue: string): void {
        const element = parent.querySelector<HTMLElement>(selector);
        if (element) {
            element.style.setProperty(styleProp, styleValue);
        }
    }

    protected toggleElementClass(element: HTMLElement, targetClass: string): void {
        element.classList.toggle(targetClass);
    }

    protected removeElementClass(parent: ParentNode, selector: string, targetClass: string): void {
        const element = parent.querySelector<HTMLElement>(selector);
        if (element) {
            element.classList.remove(targetClass);
        }
    }
}

export default DOM_Manipulator;
