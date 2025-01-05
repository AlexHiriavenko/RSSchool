const nonogram = JSON.parse(localStorage.getItem("currentNonogram"));
const savedGame = nonogram?.currentProgress?.length ? nonogram : null;

export const AppState = {
  isMusicOn: false,
  currentTrack: null,
  isSoundEffectsOn: false,
  darkMode: localStorage.getItem("darkMode_") || "off",
  nonogram: {
    playerName: savedGame?.playerName || "",
    difficulty: savedGame?.difficulty || "",
    name: savedGame?.name || "",
    matrix: savedGame?.matrix || [],
    currentProgress: savedGame?.currentProgress || [],
    truthyCellsIndexes: savedGame?.truthyCellsIndexes || [],
    excludedCellsIndexes: savedGame?.excludedCellsIndexes || [],
    truthyCells: [],
    falsyCells: [],
  },
};
