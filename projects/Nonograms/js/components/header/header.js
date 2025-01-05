import { createAppTitle } from "./appTitle/createAppTitle";
import { createHeaderBtns } from "./headerBtnGroup/createHeaderBtns";

export function createHeader(
  insertMethod = "beforeend",
  referenceElement = document.body,
) {
  if (!(referenceElement instanceof HTMLElement)) {
    console.error(
      `the ${referenceElement} element you are trying to use as a reference to insert another element is not an html DOM element`,
    );
    return null;
  }

  const container = document.createElement("div");
  container.className = "header__container app-container";
  const header = document.createElement("header");

  const headerBtns = createHeaderBtns();
  const appTitle = createAppTitle();

  container.append(appTitle, headerBtns.containerBtns);
  header.append(container);

  referenceElement.insertAdjacentElement(insertMethod, header);

  return header;
}
