import { createPlayerNameInput } from "../../components/gameSettings/playerNameInput/playerNameInput";
import { generateRandomGame } from "./generateRandomGame";
import { closeModal } from "../../components/modal/functions/closeModal";

export function createRandomGameForm() {
  const form = document.createElement("form");
  form.className = "random-settings-container";

  const h3 = document.createElement("h3");
  h3.textContent = "Random Game";
  h3.className = "difficulty-label form-title";

  const p = document.createElement("p");
  p.textContent = "Difficulty level and Nonogram will be generated randomly";
  p.className = "random-settings-text";

  const playerNameInput = createPlayerNameInput();

  const btn = document.createElement("input");
  btn.className = "control-btn start-game-btn";
  btn.value = "OK";
  btn.type = "submit";

  form.append(h3, p, playerNameInput.label, btn);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    generateRandomGame(null, playerNameInput.input.value);
    closeModal();
  });
  return {
    form: form,
    input: btn,
  };
}
