import { setNonogramState } from "../../helpers/setNonogramState";
import { difficultyOptions } from "../../components/gameSettings/difficultyOptions/difficultyOptions";
import { playerNameInput } from "../../components/gameSettings/playerNameInput/playerNameInput";
import { nonogramOptions } from "../../components/gameSettings/nonogramOptions/nonogramOptions";
import { nonograms } from "../../nonograms/nonograms";
import { sounds, playSound } from "../../sounds/sounds";
import { closeModal } from "../../components/modal/functions/closeModal";
import { gameInterface, gameContainer } from "../../App";
import { generateNonogramTable } from "../../nonograms/nonogramFunctions/generateNonogramTable";
import { arrFillZeros } from "../../helpers/arrFillZeros";
import { resetNonogramState } from "../../helpers/resetNonogramState";
import { TimerHTML } from "../../components/timer/timer";
import { clearTimer } from "../tbodyClick/setTimer";

export function startGameClick(event) {
  event.preventDefault();
  resetNonogramState();
  clearTimer();
  while (gameContainer.tableContainer.firstChild) {
    gameContainer.tableContainer.firstChild.remove();
  }
  playSound(sounds.startGame);

  gameInterface.btnControls[0].style.pointerEvents = "all";

  const playerName = playerNameInput.input.value.trim() || "Uknown Player";
  const difficulty = difficultyOptions.select.value;
  const nonogramName = nonogramOptions.select.value;
  const matrix = nonograms[difficulty].find(
    ({ name }) => name === nonogramName
  ).matrix;
  const currentProgress = arrFillZeros(matrix.length);

  setNonogramState(
    difficulty,
    nonogramName,
    matrix,
    currentProgress,
    playerName
  );

  const table = generateNonogramTable(matrix);

  gameContainer.tableContainer.append(table);
  gameContainer.gameContainer.insertAdjacentElement(
    "afterbegin",
    TimerHTML.timerSection
  );

  closeModal();
}
