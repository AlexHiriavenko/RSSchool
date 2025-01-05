import { closeModal } from "../modal/functions/closeModal";

export function howToPlay() {
  const helpInfo = document.createElement("div");
  helpInfo.className = "help-info";

  const h3 = document.createElement("h3");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const p4 = document.createElement("p");
  const btn = document.createElement("buttom");

  btn.className = "control-btn ok";
  h3.className = "help-info-title";
  [p1, p2, p3, p4].forEach((p) => (p.className = "help-text"));

  h3.textContent = "How to play";
  p1.textContent = "First left-click: to paint over the cell";
  p2.textContent = "Second left-click: to cleare the cell";
  p3.textContent =
    "Right-Click or long touch on mobile: to exclude the cell (x)";
  p4.textContent =
    "Victory Condition: All necessary cells are filled in, The remaining cells are either empty or excluded (x)";
  btn.textContent = "OK";

  btn.addEventListener("click", closeModal);

  helpInfo.append(h3, p1, p2, p3, p4, btn);

  return helpInfo;
}
