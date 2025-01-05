import resetGame from "../game/resetGame";
import createGame from "../game/createGame";
import closeModal from "./functions/closeModal";
import { preview } from "../preview/preview";
import showElement from "../../helpers/showElement";

function createModal() {
  const modalContainer = document.createElement("div");
  modalContainer.id = "modal-container";

  const modalContent = document.createElement("div");
  modalContent.id = "modal-content";
  modalContent.setAttribute("onclick", "event.stopPropagation();");

  const modalTitle = document.createElement("h3");
  modalTitle.className = "modal-title";

  const secretWord = document.createElement("p");
  secretWord.className = "modal-secret-word";

  const gif = document.createElement("img");
  gif.className = "modal-gif";

  const btnGroup = document.createElement("div");
  btnGroup.className = "btn-group";

  const startGame = document.createElement("button");
  startGame.className = "start-game modal-btn";
  startGame.textContent = "Play Again";

  const exitGame = document.createElement("button");
  exitGame.className = "start-game modal-btn";
  exitGame.textContent = "Exit Game";

  btnGroup.append(startGame, exitGame);
  modalContent.append(modalTitle, secretWord, gif, btnGroup);
  modalContainer.appendChild(modalContent);
  document.body.appendChild(modalContainer);

  startGame.addEventListener("click", () => {
    resetGame();
    createGame();
    closeModal();
  });

  exitGame.addEventListener("click", () => {
    resetGame();
    showElement(preview.appContainer);
    closeModal();
  });

  return {
    modalContainer: modalContainer,
    modalContent: modalContent,
    modalTitle: modalTitle,
    gif: gif,
    secretWord: secretWord,
    startGame: startGame,
    exitGame: exitGame,
  };
}

export const modal = createModal();
