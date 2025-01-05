import { closeModal } from "../functions/closeModal";

export function createVictoryMessage() {
  let timerValue = Number(localStorage.getItem("timer")) || 0;
  const messageContainer = document.createElement("div");
  messageContainer.className = "container-victory-message alert-container";

  const messageText = document.createElement("p");
  messageText.className = "help-text alert-text2";
  messageText.textContent = `Congratulations! You solved the nonogram in ${timerValue} seconds`;

  const btnOK = document.createElement("button");
  btnOK.className = "control-btn start-game-btn";
  btnOK.textContent = "HOORAY!";
  btnOK.addEventListener("click", closeModal);

  messageContainer.append(messageText, btnOK);

  return messageContainer;
}
