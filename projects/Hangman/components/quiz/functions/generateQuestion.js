import { questions } from "../questions";
import { appState } from "../../../appState";

function generateQuestion() {
  const keys = Object.keys(questions);

  let questionIndex = Math.floor(Math.random() * keys.length);
  let lastQuestionIndex = +localStorage.getItem("lastQuestionIndex");
  if (lastQuestionIndex !== null && lastQuestionIndex >= 0) {
    while (questionIndex === lastQuestionIndex) {
      questionIndex = Math.floor(Math.random() * keys.length);
    }
  }
  localStorage.setItem("lastQuestionIndex", questionIndex);

  appState.currentQuestion = keys[questionIndex];
  appState.currentAnswer = questions[appState.currentQuestion];

  return appState.currentQuestion;
}

export default generateQuestion;
