import { modal } from "../createModal";

function closeModal() {
  const { modalContainer, modalContent, startGame, exitGame } = modal;

  startGame.disabled = true;
  exitGame.disabled = true;

  modalContainer.classList.remove("active");
  modalContent.classList.remove("active");

  document.body.style.overflow = "auto";
}

export default closeModal;
