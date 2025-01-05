import { burgerBtnLines } from "../headerConstansts";

export function setBtnBurgerState(isBurgerOpen) {
    for (const line of burgerBtnLines) {
        isBurgerOpen
            ? line.classList.add("opened")
            : line.classList.remove("opened");
    }
}
