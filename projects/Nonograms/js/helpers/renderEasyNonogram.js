import { AppState } from "../AppState";
import { generateRandomGame } from "../listenerHandlers/randomGameClick/generateRandomGame";
import { renderBtnContinue } from "../components/btnContinue/btnContinue";

export function renderEasyNonogram() {
  const isSavedGame = AppState.nonogram.currentProgress.length > 0;

  isSavedGame
    ? renderBtnContinue()
    : generateRandomGame("easy", "Uknown Player");
}
