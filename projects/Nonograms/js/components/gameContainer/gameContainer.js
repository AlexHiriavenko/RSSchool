export function createGameContainer(
  insertMethod = "beforeend",
  referenceElement = document.body,
) {
  if (!(referenceElement instanceof HTMLElement)) {
    console.error(
      `the ${referenceElement} element you are trying to use as a reference to insert another element is not an html DOM element`,
    );
    return null;
  }

  const gameContainer = document.createElement("div");
  gameContainer.className = "app-container game-container";

  const tableContainer = document.createElement("div");
  tableContainer.className = "table-container";

  const bannerContainer = document.createElement("div");
  bannerContainer.className = "banner-container";

  const banner = document.createElement("img");
  banner.className = "banner";
  banner.src = "./app-files/imgs/thinking-manikin.png";

  // const p = document.createElement("p");
  // p.className = "message-unselected";
  // p.textContent = "Nonogram not selected";

  // tableContainer.appendChild(p);
  bannerContainer.appendChild(banner);
  gameContainer.append(tableContainer, bannerContainer);

  referenceElement.insertAdjacentElement(insertMethod, gameContainer);

  return {
    gameContainer: gameContainer,
    tableContainer: tableContainer,
  };
}
