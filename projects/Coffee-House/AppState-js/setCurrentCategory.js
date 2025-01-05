import getProducts from "../JS-Helpers/getProducts";
import { appState } from "./appState";

async function setCurrentCategory(category = "coffee") {
  const products = await getProducts();
  const currentCategory = products
    .filter((drink) => drink.category === category)
    .map((drink, index) => {
      drink.imgURL = `../cards-images/${drink.category}/${drink.category}-${
        index + 1
      }.png`;
      drink.id = `${category}-${index + 1}`;
      return drink;
    });
  appState.currentCategory = currentCategory;
}

export default setCurrentCategory;
