import { appState } from "../../../../AppState-js/appState";
import { modalContent } from "../modalConstants";

export function resetModalState() {
  appState.currentCard = {};
  appState.priceParts = {
    default: 0,
    size: 0,
    additive1: 0,
    additive2: 0,
    additive3: 0,
  };
  const activeBtns = modalContent.querySelectorAll(".active");
  [...activeBtns].forEach((btn) => {
    btn.classList.remove("active");
    btn.disabled = false;
  });
  const defaultActive = modalContent.querySelector('[data-size="s"]');
  defaultActive.classList.add("active");
  defaultActive.disabled = true;
}
