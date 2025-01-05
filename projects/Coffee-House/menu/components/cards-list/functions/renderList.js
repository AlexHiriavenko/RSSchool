import { openModal } from "../../modal/functions/openModal.js";
import { create_List_Item_Markup } from "./create_List_Item_Markup.js";

export function renderList(drinks) {
  const prevList = document.querySelector(".cards-list");
  const ul = document.createElement("ul");
  ul.className = "cards-list";
  drinks.forEach((drink, index) => {
    const li = document.createElement("li");
    li.className = "card";
    li.id = `${drink.category}-${index + 1}`;
    li.innerHTML = create_List_Item_Markup(drink);
    li.addEventListener("click", openModal);
    ul.append(li);
  });
  const btnGroupCategories = document.querySelector(".menu-items");
  if (prevList) {
    prevList.remove();
  }
  btnGroupCategories.after(ul);
}
