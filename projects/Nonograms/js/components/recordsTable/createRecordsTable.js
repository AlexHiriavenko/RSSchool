import { closeModal } from "../modal/functions/closeModal";
import { formatTime } from "../../helpers/formatTime";

export function createRecordsTable(recordsData) {
  const container = document.createElement("div");
  container.className = "records-container";

  const h3 = document.createElement("h3");
  h3.textContent = "Records";
  h3.className = "difficulty-label form-title";

  const btn = document.createElement("button");
  btn.className = "control-btn start-game-btn";
  btn.textContent = "OK";
  btn.addEventListener("click", closeModal);

  const sortedRecords = recordsData.sort((a, b) => {
    const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
    return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
  });

  // Создаем таблицу и заголовок
  const table = document.createElement("table");
  table.className = "records-table";
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  // Добавляем заголовки
  const headers = ["#", "Player Name", "Nonogram", "Difficulty", "Time"];
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.className = "records__th";
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Создаем тело таблицы
  const tbody = document.createElement("tbody");

  // Добавляем строки данных
  sortedRecords.forEach((record, index) => {
    const row = document.createElement("tr");

    // Добавляем порядковый номер
    const indexCell = document.createElement("td");
    indexCell.textContent = (index + 1).toString();
    row.appendChild(indexCell);

    // Добавляем ячейки данных
    const dataCells = ["playerName", "name", "difficulty", "time"];
    dataCells.forEach((cellKey) => {
      const td = document.createElement("td");
      if (cellKey === "time" && !isNaN(record[cellKey])) {
        td.textContent = formatTime(record[cellKey]);
      } else {
        td.textContent = record[cellKey];
      }
      row.appendChild(td);
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  container.append(h3, table, btn);

  return container;
}
