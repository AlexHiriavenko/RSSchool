import { appState } from "../../../../AppState-js/appState";
import { calculatePrice } from "./calculatePrice";

export function setSizePrice(targetBtn) {
  const targetSize = targetBtn.dataset.size;
  appState.priceParts.size =
    +appState.currentCard.sizes[targetSize]["add-price"];
  calculatePrice();
}
