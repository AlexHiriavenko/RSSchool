import { sounds, playSound } from "../../sounds/sounds";
import { openModal } from "../../components/modal/functions/openModal";
import { modal } from "../../App";
import { gameInterface, gameSettings } from "../../App";

export function newGameClick() {
  gameInterface.btnGroup.style.pointerEvents = "none";
  playSound(sounds.newGame);
  modal.modalWindow.classList.add("confirm");
  openModal(gameSettings);
}
