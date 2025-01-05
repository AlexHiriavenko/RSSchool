import { appState } from "../../../AppState-js/appState.js";
import { setBurgerState } from "../../../AppState-js/setBurgerState.js";
import { setBtnBurgerState } from "./setBtnBurgerState.js";
import { setScroll } from "../../../JS-Helpers/setScroll.js";
import { setBurgerMenuState } from "./setBurgerMenuState.js";

export function toggleBurgerState() {
    setBurgerState(appState);
    setBurgerMenuState(appState.isBurgerOpen)
    setBtnBurgerState(appState.isBurgerOpen);
    setScroll(appState.isBurgerOpen);
}
