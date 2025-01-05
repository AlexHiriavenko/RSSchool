import { btnLoadMore } from "../constantsCardsList";

export function setVisible_BtnLoadMore(currentCategory) {
  currentCategory.length > 4
    ? btnLoadMore.classList.remove("hidden")
    : btnLoadMore.classList.add("hidden");
}
