export function createPlayerNameInput() {
  const label = document.createElement("label");
  label.for = "playerName";
  label.className = "difficulty-label";

  const input = document.createElement("input");
  input.placeholder = "unknown player";
  input.maxLength = 12;
  input.id = "playerName";

  const span = document.createElement("span");
  span.className = "label-title";
  span.textContent = "Player Name:";

  label.append(span, input);

  return {
    label: label,
    input: input,
  };
}

export const playerNameInput = createPlayerNameInput();
