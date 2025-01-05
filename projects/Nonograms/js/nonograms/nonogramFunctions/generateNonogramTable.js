import { AppState } from "../../AppState";
import { howToPlay } from "../../components/howToPlay/howToPlay";
import { openModal } from "../../components/modal/functions/openModal";
import { modal } from "../../App";
import { calcShadedCells } from "./calcShadedCells";
import { rotateMatrix } from "./rotateMatrix";
import { tbodyLeftClick } from "../../listenerHandlers/tbodyClick/tbodyLeftClick";
import { tbodyRightClick } from "../../listenerHandlers/tbodyClick/tbodyRightClick";
import { startTimer } from "../../listenerHandlers/tbodyClick/setTimer";

export function generateNonogramTable(matrix) {
  const cells = [];
  const falsyCells = [];
  const truthyCells = [];
  // для заголовка вверху нужно перевернуть матрицу
  const rotatedMatrix = rotateMatrix(matrix);

  const table = document.createElement("table");
  table.id = "table";
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  // Создание заголовка таблицы (thead) сверху
  const theadRow = document.createElement("tr");
  for (let i = 0; i <= matrix.length; i++) {
    const th = document.createElement("th");
    th.className = `th_top ${AppState.nonogram.difficulty}`;

    // ячейка верхний левый угол, тут будет справка(модалка) как играть
    if (i === 0) {
      const helpBtn = document.createElement("button");
      helpBtn.textContent = "?";
      helpBtn.title = "HELP";
      helpBtn.addEventListener("click", (event) => {
        modal.modalWindow.classList.add("confirm");
        openModal(howToPlay());
      });
      th.appendChild(helpBtn);
    }

    // вертикальный заголовок сверху
    if (i > 0 && rotatedMatrix[i - 1]) {
      const shadedCellsContent = calcShadedCells(rotatedMatrix[i - 1]);
      th.innerHTML = shadedCellsContent.replace(/\s/g, "<br>"); // риплейс пробел -> br
    }

    theadRow.appendChild(th);
  }
  thead.appendChild(theadRow);

  // Создание ячеек для каждой строки и столбца
  for (let i = 0; i < matrix.length; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j <= matrix.length; j++) {
      // классы difficulty для адаптива css (разные размеры таблиц)
      let cell;
      // Горизонтальный заголовок слева
      if (j === 0) {
        cell = document.createElement("th");
        cell.classList.add("th_left", AppState.nonogram.difficulty);
        cell.textContent = calcShadedCells(matrix[i]);
      } else {
        // Тело таблицы
        cell = document.createElement("td");
        // акцентная граница для блока 5х5
        cell.classList.add("td", AppState.nonogram.difficulty);
        if (j % 5 === 0 && matrix.length > 5 && j !== matrix[i].length) {
          cell.classList.add("border5x5V");
        }
        if ((i + 1) % 5 === 0 && matrix.length > 5 && i + 1 !== matrix.length) {
          cell.classList.add("border5x5H");
        }
        // для showSolution, чтобы опять не бегать циклами:
        // собираем в отдельный массив все "правдивые" ячейки
        if (matrix[i][j - 1] === 1) {
          truthyCells.push(cell);
        }
        // собираем в отдельный массив все "ложные" ячейки
        if (matrix[i][j - 1] === 0) {
          falsyCells.push(cell);
        }
        cells.push(cell);
      }
      row.appendChild(cell);
    }

    tbody.appendChild(row);
  }

  table.appendChild(thead);
  table.appendChild(tbody);

  tbody.addEventListener("click", (event) => tbodyLeftClick(event, cells));
  tbody.addEventListener("contextmenu", (event) =>
    tbodyRightClick(event, cells)
  );
  let timerValue = Number(localStorage.getItem("timer")) || 0;
  tbody.addEventListener("click", () => startTimer(timerValue), { once: true });

  AppState.nonogram.truthyCells = truthyCells;
  AppState.nonogram.falsyCells = falsyCells;

  return table;
}
