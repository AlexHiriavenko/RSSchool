import { newGameClick } from "../../listenerHandlers/newGameClick/newGameClick";
import { showSolutionClick } from "../../listenerHandlers/showSolutionClick/showSolutionClick";
import { randomGameClick } from "../../listenerHandlers/randomGameClick/randomGameClick";
import { resetGameClick } from "../../listenerHandlers/resetGameClick/resetGameClick";
import { recordsClick } from "../../listenerHandlers/recordsClick/recordsClick";

export function createGameInterface(
  insertMethod = "beforeend",
  referenceElement = document.body
) {
  if (!(referenceElement instanceof HTMLElement)) {
    console.error(
      `the ${referenceElement} element you are trying to use as a reference to insert another element is not an html DOM element`
    );
    return null;
  }

  const btnGroup = document.createElement("div");
  btnGroup.className = "gameBtnGroup app-container";

  const btnClickHandlers = {
    "New Game": newGameClick,
    "Random Game": randomGameClick,
    "Reset Game": resetGameClick,
    "Show Solution": showSolutionClick,
    Records: recordsClick,
  };

  const btnControls = Object.keys(btnClickHandlers).map((btnName) => {
    const btn = document.createElement("button");
    const btnClass = btnName.toLowerCase().replaceAll(" ", "-");
    btn.className = `control-btn ${btnClass}`;
    btn.textContent = btnName;

    // Получение коллбека для каждой кнопки (он разный)
    const btnClickHandler = btnClickHandlers[btnName];

    // слушатель с вызовом соответствующей функции обратного вызова
    btn.addEventListener("click", (event) => btnClickHandler(event));

    btnGroup.appendChild(btn);
    return btn;
  });

  referenceElement.insertAdjacentElement(insertMethod, btnGroup);

  return {
    btnGroup: btnGroup,
    btnControls: btnControls,
  };
}
