import { AppState } from "../AppState";

export function setNonogramState(
  difficulty = "easy",
  name = "Dinosaur",
  matrix = [],
  currentProgress = [],
  playerName = "Uknown Player"
) {
  AppState.nonogram.difficulty = difficulty;
  AppState.nonogram.name = name;
  AppState.nonogram.matrix = matrix;
  AppState.nonogram.currentProgress = currentProgress;
  AppState.nonogram.playerName = playerName;

  const nonogramData = {
    difficulty,
    name,
    matrix,
    currentProgress,
    playerName,
  };

  localStorage.setItem("currentNonogram", JSON.stringify(nonogramData));
}
