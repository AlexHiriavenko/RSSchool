import createGallows from "../gallows/gallows";
import createQuiz from "../quiz/quiz";
import createKeyboard from "../keyboard/createKeyBoard";
import onKeyClick from "../keyboard/functions/onKeyClick";
import onKeyDown from "../keyboard/functions/onKeyDown";

function createGame() {
  const game = document.createElement("div");
  game.className = "game";

  const { gallows, manikinParts } = createGallows();
  const { quiz, counter, hiddenLetters } = createQuiz();
  const { keyboard, keyboardBtns } = createKeyboard();

  const quizContainer = document.createElement("div");
  quizContainer.className = "quiz-container";

  quizContainer.append(quiz, keyboard);
  game.append(gallows, quizContainer);
  document.body.append(game);

  const keyClickHandler = (event) =>
    onKeyClick(event, counter, hiddenLetters, manikinParts, removeKeyListener);

  const keyDownHandler = (event) => onKeyDown(event, keyboardBtns);

  keyboard.addEventListener("click", keyClickHandler);
  document.addEventListener("keydown", keyDownHandler);

  function removeKeyListener() {
    keyboard.removeEventListener("click", keyClickHandler);
    document.removeEventListener("keydown", keyDownHandler);
  }
}

export default createGame;
