import { appState } from "../../../../AppState-js/appState.js";
import {
  drinkName,
  drinkAbout,
  drinkPrice,
  drinkImage,
  additives,
  drinkSizes,
} from "../modalConstants.js";

export function setDrinkContent(id) {
  const currentCard = appState.currentCategory.find((drink) => drink.id === id);
  appState.currentCard = currentCard;
  appState.priceParts.default = +appState.currentCard.price;
  const { name, description, price, imgURL } = currentCard;

  drinkName.textContent = name;
  drinkAbout.textContent = description;
  drinkPrice.textContent = price;
  drinkImage.src = imgURL;
  [...additives].forEach((additive, i) => {
    additive.textContent = currentCard.additives[i].name;
  });
  [...drinkSizes].forEach((size, i) => {
    size.textContent = Object.values(currentCard.sizes)[i].size;
  });
}
