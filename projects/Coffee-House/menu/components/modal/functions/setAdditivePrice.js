import { appState } from "../../../../AppState-js/appState";
import { calculatePrice } from "./calculatePrice";

export function setAdditivePrice(targetBtn) {
  const [[dataAttributeName, dataAttributeValue]] = Object.entries(
    targetBtn.dataset
  );
  if (targetBtn.matches(".active")) {
    appState.priceParts[dataAttributeName] =
      +appState.currentCard.additives[dataAttributeValue]["add-price"];
  }
  if (!targetBtn.matches(".active")) {
    appState.priceParts[dataAttributeName] = 0;
  }
  calculatePrice();
}
