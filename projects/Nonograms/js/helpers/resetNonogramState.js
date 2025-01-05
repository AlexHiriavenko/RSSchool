import { AppState } from "../AppState";

export function resetNonogramState() {
  AppState.nonogram.playerName = "";
  AppState.nonogram.name = "";
  AppState.nonogram.difficulty = "";
  AppState.nonogram.currentProgress = [];
  AppState.nonogram.falsyCells = [];
  AppState.nonogram.truthyCells = [];
  AppState.nonogram.matrix = [];
  AppState.nonogram.truthyCellsIndexes = [];
  AppState.nonogram.excludedCellsIndexes = [];

  const nonogramData = {
    playerName: "",
    difficulty: "",
    name: "",
    matrix: [],
    currentProgress: [],
    truthyCellsIndexes: [],
    excludedCellsIndexes: [],
  };

  localStorage.setItem("currentNonogram", JSON.stringify(nonogramData));
}
