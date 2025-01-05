import { createHeader } from "./components/header/header";
import { createGameInterface } from "./components/gameInterface/gameInterface";
import { createGameContainer } from "./components/gameContainer/gameContainer";
import { createModal } from "./components/modal/modal";
import { createGameSettings } from "./components/gameSettings/gameSettings";
import { renderEasyNonogram } from "./helpers/renderEasyNonogram";

export const header = createHeader("afterbegin", document.body);

export const gameInterface = createGameInterface("afterend", header);

export const gameContainer = createGameContainer(
  "afterend",
  gameInterface.btnGroup,
);

export const modal = createModal();

export const gameSettings = createGameSettings();

renderEasyNonogram();
