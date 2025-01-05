import { appState } from "../../appState";
import generateQuestion from "./functions/generateQuestion";

function createQuiz() {
  const quizWrap = document.createElement("div");
  quizWrap.className = "quiz-wrap";

  const counterTitle = document.createElement("h2");
  counterTitle.className = "counter-title";
  counterTitle.textContent = "Incorrect Answers:";

  const counterText = document.createElement("p");
  counterText.className = "counter-text";

  const counter = document.createElement("span");
  counter.className = "counter";
  counter.textContent = appState.mistakesCounter;

  const question = document.createElement("p");
  question.className = "question-text";
  question.textContent = generateQuestion();

  const answer = document.createElement("p");
  answer.className = "answer-text";

  let hiddenLetters = appState.currentAnswer.split("").map((letter) => {
    const span = document.createElement("span");
    span.className = "answer-letter";
    span.textContent = "_";
    return span;
  });

  answer.append(...hiddenLetters);
  counterText.append(counter, document.createTextNode("/6"));
  quizWrap.append(counterTitle, counterText, question, answer);

  console.log("answer: " + appState.currentAnswer);
  return {
    quiz: quizWrap,
    counter: counter,
    hiddenLetters: hiddenLetters,
  };
}

export default createQuiz;
