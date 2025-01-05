import './sources.css';
import DOM_Manipulator from '../../DOM_Manipulator/DOM_Manipulator';
import { NewsSource, SourcesInterface } from '../../../types/interfaces';
import { Nullable } from '../../../types/generics';
import Burger from '../burger/burger';

class Sources extends DOM_Manipulator implements SourcesInterface {
    burger: Burger;

    constructor() {
        super();
        this.burger = new Burger();
    }

    public draw(data: NewsSource[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: Nullable<HTMLTemplateElement> = document.querySelector('#sourceItemTemp');

        if (sourceItemTemp) {
            data.forEach((item) => {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

                this.setElementAttribute(sourceClone, '.source__item', 'data-source-id', item.id);
                this.setElementTextContent(sourceClone, '.source__item-name', item.name);

                fragment.append(sourceClone);
            });

            const sources: Nullable<HTMLElement> = document.querySelector('.sources');

            sources?.addEventListener('click', (e: MouseEvent) => {
                if (e.target instanceof HTMLElement && e.target?.closest('.source__item')) {
                    this.burger.hideBurgerMenu();
                }
            });
            sources?.append(fragment);
        }
    }
}

export default Sources;
