import { setActiveTab } from "./setActiveTab";
import setCurrentCategory from "../../../../AppState-js/setCurrentCategory";
import { renderList } from "./renderList";
import { appState } from "../../../../AppState-js/appState";
import { setVisible_BtnLoadMore } from "./setVisible_BtnLoadMore";

export function clickTab(event) {
  const target = event.target.closest("button");
  setActiveTab(target);
  setCurrentCategory(target.dataset.category).then(() => {
    renderList(appState.currentCategory);
    setVisible_BtnLoadMore(appState.currentCategory);
  });
}
