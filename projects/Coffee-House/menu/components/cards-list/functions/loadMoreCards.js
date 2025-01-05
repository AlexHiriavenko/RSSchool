import { btnLoadMore } from "../constantsCardsList";

export function loadMoreCards() {
  const cardsList = document.querySelector(".cards-list");
  cardsList.classList.add("full");
  btnLoadMore.classList.add("hidden");
}
