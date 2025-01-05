import { appState } from "../../../appState";
import openModal from "../../modal/functions/openModal";

function handleIncorrectAnswer(counter, manikinParts, removeKeyListener) {
  appState.mistakesCounter += 1;
  counter.textContent = appState.mistakesCounter;
  manikinParts[appState.mistakesCounter - 1]?.classList.add("visible");

  if (appState.mistakesCounter === 3) {
    counter.classList.add("mini-alert");
  }
  if (appState.mistakesCounter === 4) {
    counter.classList.replace("mini-alert", "alert");
  }
  if (appState.mistakesCounter === 5) {
    counter.classList.replace("alert", "extra-alert");
  }
  if (appState.mistakesCounter > 5) {
    removeKeyListener();
    setTimeout(openModal, 400);
  }
}

export default handleIncorrectAnswer;
