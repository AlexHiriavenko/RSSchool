import { sounds, playSound } from "../../../sounds/sounds";
import { setNonogramSelect } from "../nonogramOptions/setNonogramSelect";

export function createDifficultyOptions() {
  const select = document.createElement("select");
  select.id = "difficulty-select";
  select.name = "difficulty";

  const label = document.createElement("label");
  label.className = "difficulty-label";
  label.htmlFor = "difficulty-select";

  const span = document.createElement("span");
  span.textContent = "Choose Difficulty:";
  span.className = "label-title";

  const options = [
    { value: "easy", label: "Easy (5x5)" },
    { value: "medium", label: "Medium (10x10)" },
    { value: "hard", label: "Hard (15x15)" },
  ];

  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.value;
    optionElement.textContent = option.label;
    optionElement.className = "difficulty-option";

    if (optionElement.value === "easy") {
      optionElement.selected = true;
    }

    select.appendChild(optionElement);
  });

  select.addEventListener("change", function () {
    const difficulty = select.value;

    playSound(sounds[difficulty]);

    setNonogramSelect(difficulty);
  });

  label.append(span, select);

  return { label: label, select: select };
}

export const difficultyOptions = createDifficultyOptions();
