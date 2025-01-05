import { burgerMenu } from "../headerConstansts"

export function setBurgerMenuState(isBurgerOpen) {
    isBurgerOpen ? burgerMenu.classList.add("burger-open") : burgerMenu.classList.remove("burger-open")
}