import { nonograms } from "../../../nonograms/nonograms";
import { nonogramOptions } from "./nonogramOptions";

export function setNonogramSelect(difficulty = "easy") {
  nonogramOptions.select.innerHTML = "";

  const nonogramCategory = nonograms[difficulty];
  const nonogramNames = nonogramCategory.map((nonogram) => nonogram.name);

  nonogramNames.forEach((name) => {
    const optionElement = document.createElement("option");
    optionElement.value = name;
    optionElement.textContent = name;
    optionElement.className = "nonogram-names-option";

    nonogramOptions.select.appendChild(optionElement);
  });
}
