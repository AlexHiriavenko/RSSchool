import { AppState } from "../AppState";

export function writeRecord() {
  const playerName = AppState.nonogram.playerName;
  const name = AppState.nonogram.name;
  const difficulty = AppState.nonogram.difficulty;
  let time = Number(localStorage.getItem("timer")) || 0;

  const record = {
    playerName: playerName,
    name: name,
    difficulty: difficulty,
    time: time,
  };

  const recordsData = JSON.parse(localStorage.getItem("records")) || [];

  while (recordsData.length > 4) {
    recordsData.pop();
  }

  recordsData.unshift(record);

  const difficultyOrder = { easy: 1, medium: 2, hard: 3 };

  // Сортировка сначала по сложности, а затем по времени
  recordsData.sort((a, b) => {
    if (difficultyOrder[a.difficulty] !== difficultyOrder[b.difficulty]) {
      return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
    } else {
      return a.time - b.time;
    }
  });

  localStorage.setItem("records", JSON.stringify(recordsData));
}
