import createPreview from "./functiions/createPreview";
import renderPreview from "./functiions/renderPreview";
import hideElement from "../../helpers/hideElement";
import createGame from "../game/createGame";

export const preview = createPreview();

renderPreview(preview.appContainer);

preview.playButton.addEventListener("click", () => {
  hideElement(preview.appContainer);
  createGame();
});
