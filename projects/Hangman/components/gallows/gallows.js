import createLogo from "./functions/createLogo";
import createGallowsImg from "./functions/createGallowsImg";
import createManikinParts from "./functions/createManikinParts";

function createGallows() {
  const gallowsContainer = document.createElement("div");
  gallowsContainer.className = "gallows";

  const logo = createLogo();
  const gallowsImg = createGallowsImg();
  const manikinParts = createManikinParts();

  gallowsContainer.append(logo, gallowsImg, ...manikinParts);

  return {
    gallows: gallowsContainer,
    manikinParts: manikinParts,
  };
}

export default createGallows;
