import { modal } from "../../../App";
import { closeModal } from "../functions/closeModal";
import { showSolution } from "../../../listenerHandlers/showSolutionClick/showSolution";
import { AppState } from "../../../AppState";
import { playSound, sounds } from "../../../sounds/sounds";
import { gameContainer } from "../../../App";

export function createSolutionAlert() {
  const isGameExist =
    AppState.nonogram.matrix.length &&
    gameContainer.tableContainer.firstElementChild.nodeName === "TABLE";

  const alertContainer = document.createElement("div");
  alertContainer.className = "alert-container";

  if (isGameExist) {
    playSound(sounds.showSolution);
    modal.modalWindow.classList.add("confirm");

    const alertMessage = document.createElement("p");
    alertMessage.className = "help-text alert-text";
    alertMessage.textContent =
      "Are you sure you want to see the solution? In this case, you will lose your current progress. The solution will not be counted.";

    const btnGroup = document.createElement("div");
    btnGroup.className = "two-btns-group";

    const btnOK = document.createElement("button");
    const btnCancel = document.createElement("button");
    btnOK.className = "control-btn start-game-btn";
    btnCancel.className = "control-btn start-game-btn";
    btnOK.textContent = "OK";
    btnCancel.textContent = "Cancel";

    btnCancel.addEventListener("click", closeModal);
    btnOK.addEventListener("click", () => {
      showSolution();
      closeModal();
    });

    btnGroup.append(btnOK, btnCancel);

    alertContainer.append(alertMessage, btnGroup);
  } else {
    modal.modalWindow.classList.add("alert");
    const alertMessage = document.createElement("p");
    alertMessage.className = "help-text alert-text2";
    alertMessage.textContent = "No nonogram selected";
    const btnOK = document.createElement("button");
    btnOK.className = "control-btn start-game-btn";
    btnOK.textContent = "OK";
    btnOK.addEventListener("click", closeModal);

    alertContainer.append(alertMessage, btnOK);
  }

  return alertContainer;
}
