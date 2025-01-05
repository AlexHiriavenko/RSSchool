import { AppState } from "../../AppState";
import { generateNonogramTable } from "../../nonograms/nonogramFunctions/generateNonogramTable";
import { gameContainer } from "../../App";
import { TimerHTML } from "../../components/timer/timer";

export function continueGameClick() {
  const solutionMatrix = AppState?.nonogram?.matrix;

  const table = generateNonogramTable(solutionMatrix);

  while (gameContainer.tableContainer.firstChild) {
    gameContainer.tableContainer.firstChild.remove();
  }

  const truthyCellsIndexes = AppState.nonogram.truthyCellsIndexes;
  const falsyCellsIndexes = AppState.nonogram.excludedCellsIndexes;

  if (truthyCellsIndexes.length || falsyCellsIndexes.length) {
    const cells = table.querySelectorAll("td");

    cells.forEach((cell, i) => {
      if (truthyCellsIndexes.includes(i)) {
        cell.classList.add("colorized");
      }
      if (falsyCellsIndexes.includes(i)) {
        cell.classList.add("excluded");
      }
    });
  }

  TimerHTML.timerDisplay.textContent = Number(
    localStorage.getItem("timer") || 0
  );

  gameContainer.gameContainer.insertAdjacentElement(
    "afterbegin",
    TimerHTML.timerSection
  );
  gameContainer.tableContainer.append(table);
}
