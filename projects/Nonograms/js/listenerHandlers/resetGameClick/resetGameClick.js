import { AppState } from "../../AppState";
import { gameContainer } from "../../App";
import { openModal } from "../../components/modal/functions/openModal";
import { createSolutionAlert } from "../../components/modal/solutionAlert/createSolutionAlert";
import { resetGame } from "./resetGame";
import { playSound, sounds } from "../../sounds/sounds";
import { createNoReasonAlert } from "../../components/modal/noReasonAlert/noReasonAlert";

export function resetGameClick() {
  const isGameExist =
    AppState.nonogram.currentProgress.length &&
    gameContainer.tableContainer.firstElementChild.nodeName === "TABLE";

  const noReason =
    !AppState.nonogram.truthyCellsIndexes.length &&
    !AppState.nonogram.excludedCellsIndexes.length;

  if (isGameExist && noReason) {
    const noReasonMessage = createNoReasonAlert();
    openModal(noReasonMessage);
  } else if (isGameExist) {
    playSound(sounds.resetGame);
    resetGame();
  } else {
    const solutionAlertMessage = createSolutionAlert();
    openModal(solutionAlertMessage);
  }
}
