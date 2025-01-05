import { AppState } from "../../AppState";
import { gameContainer } from "../../App";
import { generateNonogramTable } from "../../nonograms/nonogramFunctions/generateNonogramTable";
import { arrFillZeros } from "../../helpers/arrFillZeros";
import { clearTimer } from "../tbodyClick/setTimer";

export function resetGame() {
  while (gameContainer.tableContainer.firstChild) {
    console.log(gameContainer.tableContainer.firstChild);
    gameContainer.tableContainer.firstChild.remove();
  }

  clearTimer();
  const matrixLength = AppState.nonogram.matrix.length;
  AppState.nonogram.currentProgress = arrFillZeros(matrixLength);
  AppState.nonogram.excludedCellsIndexes = [];
  AppState.nonogram.truthyCellsIndexes = [];

  const storageData = localStorage.getItem("currentNonogram");
  const nonogramData = JSON.parse(storageData);
  nonogramData.currentProgress = AppState.nonogram.currentProgress;
  nonogramData.excludedCellsIndexes = AppState.nonogram.excludedCellsIndexes;
  nonogramData.truthyCellsIndexes = AppState.nonogram.truthyCellsIndexes;

  localStorage.setItem("currentNonogram", JSON.stringify(nonogramData));

  const table = generateNonogramTable(AppState.nonogram.matrix);

  gameContainer.tableContainer.append(table);
}
