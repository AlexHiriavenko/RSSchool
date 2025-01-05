import { appState } from "../../../../AppState-js/appState";
import { drinkPrice } from "../modalConstants";

export function calculatePrice() {
  const priceParts = Object.values(appState.priceParts);
  const totalPrice = priceParts.reduce((acc, next) => acc + next, 0).toFixed(2);
  drinkPrice.textContent = totalPrice;
}
