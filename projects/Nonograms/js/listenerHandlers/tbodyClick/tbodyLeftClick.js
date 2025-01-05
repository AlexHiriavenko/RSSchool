import { AppState } from "../../AppState";
import { initVictory } from "../../helpers/initVictory";
import { sounds, playSound } from "../../sounds/sounds";

export function tbodyLeftClick(event, cells) {
  const progress = AppState.nonogram.currentProgress;
  const matrix = AppState.nonogram.matrix;

  if (event.target.nodeName === "TD") {
    const clickedCell = event.target;

    clickedCell.classList.contains("colorized")
      ? clickedCell.classList.remove("colorized")
      : clickedCell.classList.add("colorized");

    clickedCell.classList.remove("excluded");

    const clickedCellIndex = cells.indexOf(clickedCell);

    const progressInnerArrIndex = Math.floor(clickedCellIndex / matrix.length);
    const cellIndex = clickedCellIndex - matrix.length * progressInnerArrIndex;

    const progressTargetArray = progress[progressInnerArrIndex];
    let targetCell = progressTargetArray[cellIndex];

    targetCell = targetCell ? 0 : 1;

    progressTargetArray[cellIndex] = targetCell;

    const truthyIndexes = AppState.nonogram.truthyCellsIndexes;
    const excludedIndexes = AppState.nonogram.excludedCellsIndexes;

    if (targetCell) {
      playSound(sounds.paintClick);
      truthyIndexes.push(clickedCellIndex);
    } else {
      playSound(sounds.clearClick);
      const canceledIndex = truthyIndexes.indexOf(clickedCellIndex);
      if (canceledIndex !== -1) {
        truthyIndexes.splice(canceledIndex, 1);
      }
    }

    const canceledIndex = excludedIndexes.indexOf(clickedCellIndex);
    if (canceledIndex !== -1) {
      excludedIndexes.splice(canceledIndex, 1);
    }

    const storageData = localStorage.getItem("currentNonogram");
    const nonogramData = JSON.parse(storageData);
    nonogramData.currentProgress = progress;
    nonogramData.truthyCellsIndexes = truthyIndexes;
    nonogramData.excludedCellsIndexes = excludedIndexes;
    localStorage.setItem("currentNonogram", JSON.stringify(nonogramData));

    const victory = JSON.stringify(progress) === JSON.stringify(matrix);

    if (victory) {
      initVictory();
    }
  }
}
