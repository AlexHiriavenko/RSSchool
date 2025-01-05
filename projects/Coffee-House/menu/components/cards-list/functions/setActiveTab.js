import { menu } from "../constantsCardsList";

export function setActiveTab(targetTab) {
  const prevActive = menu.querySelector(".menu-item_btn.selected");
  if (prevActive) {
    prevActive.classList.remove("selected");
    prevActive.disabled = false;
  }
  if (targetTab) {
    targetTab.classList.add("selected");
    targetTab.disabled = true;
  }
}
