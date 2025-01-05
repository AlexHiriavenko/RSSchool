import { AppState } from "../../AppState";
import { initVictory } from "../../helpers/initVictory";
import { playSound, sounds } from "../../sounds/sounds";

export function tbodyRightClick(event, cells) {
  playSound(sounds.crossClick);

  const progress = AppState.nonogram.currentProgress;
  const matrix = AppState.nonogram.matrix;

  if (event.target.nodeName === "TD") {
    event.preventDefault();
    const clickedCell = event.target;

    const clickedCellIndex = cells.indexOf(clickedCell);

    const progressInnerArrIndex = Math.floor(clickedCellIndex / matrix.length);
    const cellIndex = clickedCellIndex - matrix.length * progressInnerArrIndex;
    const progressTargetArray = progress[progressInnerArrIndex];
    progressTargetArray[cellIndex] = 0;

    clickedCell.classList.remove("colorized");

    const excludedIndexes = AppState.nonogram.excludedCellsIndexes;
    const truthyIndexes = AppState.nonogram.truthyCellsIndexes;

    if (clickedCell.classList.contains("excluded")) {
      clickedCell.classList.remove("excluded");
      const canceledIndex = excludedIndexes.indexOf(clickedCellIndex);
      if (canceledIndex !== -1) {
        excludedIndexes.splice(canceledIndex, 1);
      }
    } else {
      clickedCell.classList.add("excluded");
      excludedIndexes.push(clickedCellIndex);
    }

    const canceledIndex = truthyIndexes.indexOf(clickedCellIndex);
    if (canceledIndex !== -1) {
      truthyIndexes.splice(canceledIndex, 1);
    }

    const storageData = localStorage.getItem("currentNonogram");
    const nonogramData = JSON.parse(storageData);
    nonogramData.excludedCellsIndexes = excludedIndexes;
    nonogramData.truthyCellsIndexes = truthyIndexes;
    localStorage.setItem("currentNonogram", JSON.stringify(nonogramData));

    const victory = JSON.stringify(progress) === JSON.stringify(matrix);

    if (victory) {
      initVictory();
    }
  }
}
