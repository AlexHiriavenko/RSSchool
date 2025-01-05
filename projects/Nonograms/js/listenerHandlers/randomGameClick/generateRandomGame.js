import { setNonogramState } from "../../helpers/setNonogramState";
import { getRandomIndex } from "../../helpers/getRandomIndex";
import { nonograms } from "../../nonograms/nonograms";
import { gameContainer } from "../../App";
import { generateNonogramTable } from "../../nonograms/nonogramFunctions/generateNonogramTable";
import { arrFillZeros } from "../../helpers/arrFillZeros";
import { playSound, sounds } from "../../sounds/sounds";
import { resetNonogramState } from "../../helpers/resetNonogramState";
import { TimerHTML } from "../../components/timer/timer";
import { clearTimer } from "../tbodyClick/setTimer";

export function generateRandomGame(difficulty, playerName) {
  playSound(sounds.randomGame);
  resetNonogramState();

  if (!difficulty) {
    const difficulties = Object.keys(nonograms);
    const difficultyIndex = getRandomIndex(difficulties.length);
    difficulty = difficulties[difficultyIndex];
  }

  const randomNonograms = Object.values(nonograms[difficulty]);
  const randomNonogramIndex = getRandomIndex(randomNonograms.length);

  const { name, matrix } = randomNonograms[randomNonogramIndex];
  const currentProgress = arrFillZeros(matrix.length);

  playerName = playerName.trim() ? playerName : "Uknown Player";
  setNonogramState(difficulty, name, matrix, currentProgress, playerName);

  while (gameContainer.tableContainer.firstChild) {
    gameContainer.tableContainer.firstChild.remove();
  }

  clearTimer();

  const table = generateNonogramTable(matrix);

  gameContainer.gameContainer.insertAdjacentElement(
    "afterbegin",
    TimerHTML.timerSection
  );
  gameContainer.tableContainer.append(table);
}
