import { modal } from "../createModal";
import { appState } from "../../../appState";

function openModal() {
  const {
    modalContainer,
    modalContent,
    modalTitle,
    secretWord,
    gif,
    startGame,
    exitGame,
  } = modal;

  secretWord.textContent = `Secret Word: "${appState.currentAnswer.toUpperCase()}"`;

  const victory = appState.mistakesCounter < 6;

  modalTitle.textContent = victory ? "Victory!" : "Defeat";
  gif.src = victory ? "./imgs/general/winner.gif" : "./imgs/general/looser.gif";

  document.body.style.overflow = "hidden";

  startGame.disabled = false;
  exitGame.disabled = false;

  modalContainer.className = "active";
  modalContent.className = "active";
}

export default openModal;
