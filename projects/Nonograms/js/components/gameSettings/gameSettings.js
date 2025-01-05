import { startGameClick } from "../../listenerHandlers/startGameClick/startGameClick";
import { difficultyOptions } from "./difficultyOptions/difficultyOptions";
import { nonogramOptions } from "./nonogramOptions/nonogramOptions";
import { playerNameInput } from "./playerNameInput/playerNameInput";

export function createGameSettings() {
  const form = document.createElement("form");
  form.className = "settings-container";

  const formTitle = document.createElement("h3");
  formTitle.textContent = "Game Settings";
  formTitle.className = "difficulty-label form-title";

  const startGameBtn = document.createElement("input");
  startGameBtn.type = "submit";
  startGameBtn.className = "control-btn start-game-btn";
  startGameBtn.value = "Start Game";

  form.addEventListener("submit", startGameClick);

  form.append(
    formTitle,
    playerNameInput.label,
    difficultyOptions.label,
    nonogramOptions.label,
    startGameBtn
  );

  return form;
}
