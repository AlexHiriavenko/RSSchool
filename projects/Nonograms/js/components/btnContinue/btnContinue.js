import { gameContainer } from "../../App";
import { continueGameClick } from "../../listenerHandlers/continueGameClick/continueGameClick";

export function renderBtnContinue() {
  const btn = document.createElement("button");
  btn.className = "control-btn";
  btn.textContent = "Continue Game";
  btn.addEventListener("click", continueGameClick);

  gameContainer.tableContainer.append(btn);
}
