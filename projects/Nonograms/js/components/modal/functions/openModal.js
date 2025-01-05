import { modal } from "../../../App";
import { setScroll } from "../../../helpers/setScroll";

export function openModal(modalContent) {
  setScroll("off");

  modal.darkSpace.classList.add("active");
  modal.modalWindow.classList.add("active");
  modal.contentContainer.innerHTML = "";

  if (modalContent) {
    if (modalContent instanceof HTMLElement) {
      modal.contentContainer.appendChild(modalContent);
    } else if (
      Array.isArray(modalContent) &&
      modalContent.every((el) => el instanceof HTMLElement)
    ) {
      modal.contentContainer.append(...modalContent);
    } else {
      console.log(modalContent);
      console.error("Invalid modalContent format");
    }
  }
}
