import './burgerMenu.css';
import DOM_Manipulator from '../../DOM_Manipulator/DOM_Manipulator';
import { Nullable } from '../../../types/generics';
import { BurgerInterface } from '../../../types/interfaces';

class Burger extends DOM_Manipulator implements BurgerInterface {
    burgerBtn: Nullable<HTMLElement> = document.querySelector('.burger-menu_button');
    sourcesList: Nullable<HTMLElement> = document.querySelector('.sources');

    private toggleBurger(): void {
        if (this.burgerBtn instanceof HTMLElement && this.sourcesList instanceof HTMLElement) {
            this.toggleElementClass(this.burgerBtn, 'active');
            this.toggleElementClass(this.sourcesList, 'active');

            if (this.burgerBtn.classList.contains('active')) {
                const clickHandler = (e: MouseEvent) => {
                    const target = e.target as HTMLElement;
                    const burgerBtn = target.closest('.burger-menu_button');
                    const sourcesList = target.closest('.sources');

                    if (!burgerBtn && !sourcesList) {
                        document.body.removeEventListener('click', clickHandler);
                        this.hideBurgerMenu();
                    }
                };

                document.body.addEventListener('click', clickHandler);
            }
        }
    }

    public setBurger(): void {
        this.burgerBtn?.addEventListener('click', () => this.toggleBurger());
    }

    public hideBurgerMenu() {
        this.sourcesList?.classList.remove('active');
        this.burgerBtn?.classList.remove('active');
    }
}

export default Burger;
