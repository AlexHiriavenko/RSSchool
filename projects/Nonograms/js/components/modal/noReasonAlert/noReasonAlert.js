import { modal } from "../../../App";
import { closeModal } from "../functions/closeModal";

export function createNoReasonAlert() {
  const alertContainer = document.createElement("div");
  alertContainer.className = "alert-container";

  modal.modalWindow.classList.add("alert");
  const alertMessage = document.createElement("p");
  alertMessage.className = "help-text alert-text2";
  alertMessage.textContent = "The field is already empty";
  const btnOK = document.createElement("button");
  btnOK.className = "control-btn start-game-btn";
  btnOK.textContent = "OK";
  btnOK.addEventListener("click", closeModal);

  alertContainer.append(alertMessage, btnOK);

  return alertContainer;
}
