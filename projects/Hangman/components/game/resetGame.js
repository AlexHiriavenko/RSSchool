import { appState } from "../../appState";

function resetGame() {
  appState.currentQuestion = "";
  appState.currentAnswer = "";
  appState.mistakesCounter = 0;
  document.querySelector(".game")?.remove();
}

export default resetGame;
