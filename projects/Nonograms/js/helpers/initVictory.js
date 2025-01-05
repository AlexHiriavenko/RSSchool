import { showSolution } from "../listenerHandlers/showSolutionClick/showSolution";
import { modal } from "../App";
import { createVictoryMessage } from "../components/modal/victoryMessage/victoryMessage";
import { openModal } from "../components/modal/functions/openModal";
import { resetNonogramState } from "./resetNonogramState";
import { sounds, playSound } from "../sounds/sounds";
import { writeRecord } from "./writeRecord";
import { stopTimer } from "../listenerHandlers/tbodyClick/setTimer";

export function initVictory() {
  playSound(sounds.victory);
  writeRecord();
  modal.modalWindow.classList.add("victory");
  const victoryMessage = createVictoryMessage();
  openModal(victoryMessage);
  stopTimer();
  showSolution();
  resetNonogramState();
}
