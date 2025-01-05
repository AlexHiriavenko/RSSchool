import { drinksTabs, btnLoadMore } from "./constantsCardsList.js";
import setCurrentCategory from "../../../AppState-js/setCurrentCategory.js";
import { renderList } from "./functions/renderList.js";
import { appState } from "../../../AppState-js/appState.js";
import { clickTab } from "./functions/clickTab.js";
import { loadMoreCards } from "./functions/loadMoreCards.js";
import { setVisible_BtnLoadMore } from "./functions/setVisible_BtnLoadMore.js";

setCurrentCategory("coffee").then(() => {
  renderList(appState.currentCategory);
  setVisible_BtnLoadMore(appState.currentCategory);
});

for (const tab of drinksTabs) {
  tab.addEventListener("click", clickTab);
}

btnLoadMore.addEventListener("click", loadMoreCards);
