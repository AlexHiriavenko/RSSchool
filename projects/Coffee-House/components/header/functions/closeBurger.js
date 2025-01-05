import { appState } from "../../../AppState-js/appState";
import { burgerBtnLines, burgerMenu } from "../headerConstansts";

export function closeBurger() {
  appState.isBurgerOpen = false;
  for (const line of burgerBtnLines) {
    line.classList.remove("opened");
  }
  document.body.style.overflow = "auto";
  burgerMenu.classList.remove("burger-open");
}
