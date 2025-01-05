import { appState } from "../../../appState";
import openModal from "../../modal/functions/openModal";

function handleCorrectAnswer(
  hiddenLetters,
  clickedKeyLetter,
  removeKeyListener,
) {
  const letterIndexes = appState.currentAnswer
    .split("")
    .reduce((acc, answerLetter, i) => {
      if (answerLetter === clickedKeyLetter) {
        acc.push(i);
      }
      return acc;
    }, []);
  hiddenLetters.forEach((span, i) => {
    if (letterIndexes.includes(i)) {
      span.textContent = clickedKeyLetter.toUpperCase();
    }
  });
  const isWinner = hiddenLetters.every((span) => span.textContent !== "_");
  if (isWinner) {
    removeKeyListener();
    setTimeout(openModal, 400);
  }
}

export default handleCorrectAnswer;
