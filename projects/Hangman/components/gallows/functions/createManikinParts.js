import { manikinParts } from "../manikinParts.js";

function createManikinParts() {
  return manikinParts.map((part) => {
    const img = document.createElement("img");
    img.src = part.src;
    img.className = part.class;
    img.alt = part.alt;
    img.width = part.width;
    return img;
  });
}

export default createManikinParts;
