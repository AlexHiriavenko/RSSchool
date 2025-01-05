export const modalContainer = document.getElementById("modal-container");
export const modalContent = document.getElementById("modal-content");
export const btnCloseModal = modalContent.querySelector(".btn-close-modal");

export const drinkName = modalContent.querySelector(".modal-drink-name");
export const drinkAbout = modalContent.querySelector(".modal-drink-about");
export const drinkPrice = modalContent.querySelector(".drink-total-price");
export const drinkImage = modalContent.querySelector(
  ".modal-card-photo-wrap img"
);
export const additives = modalContent.querySelectorAll(".additives-name");
export const drinkSizes = modalContent.querySelectorAll(".drink-size");
export const sizesBtnGroup = modalContent.querySelector(
  ".size .modal-drink-params__btnGroup"
);
export const additivesBtnGroup = modalContent.querySelector(
  ".additives .modal-drink-params__btnGroup"
);
