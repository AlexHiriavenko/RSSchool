import { appState } from "../../../appState";
import handleIncorrectAnswer from "./handleIncorrectAnswer";
import handleCorrectAnswer from "./handleCorrectAnswer";

function onKeyClick(
  event,
  counter,
  hiddenLetters,
  manikinParts,
  removeKeyListener,
) {
  const isTarget = event.target.tagName === "LI";
  const notPressed = !event.target.matches(".pressed");

  if (isTarget && notPressed) {
    const clickedKey = event.target;
    clickedKey.classList.add("pressed");
    const clickedKeyLetter = clickedKey.textContent.toLowerCase();
    const isWrongLetter = !appState.currentAnswer.includes(clickedKeyLetter);

    if (isWrongLetter) {
      handleIncorrectAnswer(counter, manikinParts, removeKeyListener);
    } else {
      handleCorrectAnswer(hiddenLetters, clickedKeyLetter, removeKeyListener);
    }
  }
}

export default onKeyClick;
