import {
  modalContainer,
  modalContent,
  sizesBtnGroup,
  additivesBtnGroup,
} from "../modalConstants";
import { appState } from "../../../../AppState-js/appState";
import { escapeKeyCloseModal } from "./escapeKeyCloseModal";
import { setScroll } from "../../../../JS-Helpers/setScroll";
import { clickBtnSize } from "./clickBtnSize";
import { clickBtnAdditive } from "./clickBtnAdditive";
import { resetModalState } from "./resetModalState";

export function closeModal() {
  appState.isModalOpen = false;
  modalContent.classList.remove("active");
  modalContainer.classList.remove("active");
  setScroll(appState.isModalOpen);

  document.removeEventListener("keydown", escapeKeyCloseModal);
  sizesBtnGroup.removeEventListener("click", clickBtnSize);
  additivesBtnGroup.removeEventListener("click", clickBtnAdditive);
  resetModalState();
}
