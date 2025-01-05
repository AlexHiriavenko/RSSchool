import {
  modalContainer,
  modalContent,
  sizesBtnGroup,
  additivesBtnGroup,
} from "../modalConstants";
import { appState } from "../../../../AppState-js/appState";
import { escapeKeyCloseModal } from "./escapeKeyCloseModal";
import { setScroll } from "../../../../JS-Helpers/setScroll";
import { setDrinkContent } from "./setDrinkContent";
import { clickBtnSize } from "./clickBtnSize";
import { clickBtnAdditive } from "./clickBtnAdditive";

export function openModal(event) {
  appState.isModalOpen = true;
  const target = event.target.closest("li");
  setDrinkContent(target.id);

  setScroll(appState.isModalOpen);
  modalContainer.classList.add("active");
  modalContent.classList.add("active");

  document.addEventListener("keydown", escapeKeyCloseModal);
  sizesBtnGroup.addEventListener("click", clickBtnSize);
  additivesBtnGroup.addEventListener("click", clickBtnAdditive);
}
