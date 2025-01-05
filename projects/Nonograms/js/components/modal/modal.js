import { cross } from "../SVG/cross";
import { closeModal } from "./functions/closeModal";

export function createModal() {
  const darkSpace = document.createElement("div");
  darkSpace.className = "modal__container";

  const modalWindow = document.createElement("div");
  modalWindow.className = "modal__content";

  const close = document.createElement("button");
  close.innerHTML = cross;
  close.className = "close";
  close.addEventListener("click", closeModal);

  const contentContainer = document.createElement("div");
  contentContainer.className = "modal__content-container";

  modalWindow.append(close, contentContainer);
  darkSpace.append(modalWindow);
  document.body.appendChild(darkSpace);

  const modal = {
    darkSpace: darkSpace,
    modalWindow: modalWindow,
    contentContainer: contentContainer,
  };

  return modal;
}
