import { sounds, playSound } from "../../../sounds/sounds";

export function createNonogramNames() {
  const select = document.createElement("select");
  select.id = "nonogram-names-select";
  select.name = "nonogram-names";

  const label = document.createElement("label");
  label.className = "nonogram-names-label";
  label.htmlFor = "nonogram-names-select";

  const span = document.createElement("span");
  span.textContent = "Choose a Nonogram:";
  span.className = "label-title";

  const nonogramNames = ["Dinosaur", "Fortress", "Plane", "Goblet", "Skull"];

  nonogramNames.forEach((name) => {
    const optionElement = document.createElement("option");
    optionElement.value = name;
    optionElement.textContent = name;
    optionElement.className = "nonogram-names-option";

    select.appendChild(optionElement);
  });

  select.addEventListener("change", () => playSound(sounds.chooseNonogram));

  label.append(span, select);

  return {
    label: label,
    select: select,
  };
}

export const nonogramOptions = createNonogramNames();
