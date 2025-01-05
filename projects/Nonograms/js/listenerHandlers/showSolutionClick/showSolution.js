import { AppState } from "../../AppState";
import { resetNonogramState } from "../../helpers/resetNonogramState";
import { stopTimer } from "../tbodyClick/setTimer";

export function showSolution() {
  stopTimer();
  localStorage.setItem("timer", 0);
  const { truthyCells, falsyCells } = AppState.nonogram;

  truthyCells.forEach((cell) => {
    cell.classList.remove("excluded");
    cell.classList.add("colorized");
  });
  falsyCells.forEach((cell) => {
    cell.classList.remove("colorized", "excluded");
  });

  const table = document.getElementById("table");
  const fatCells = table.querySelectorAll(".border5x5H, .border5x5V");

  if (fatCells.length) {
    fatCells.forEach((cell) =>
      cell.classList.remove("border5x5H", "border5x5V")
    );
  }

  table.style.pointerEvents = "none";
  resetNonogramState();
}
