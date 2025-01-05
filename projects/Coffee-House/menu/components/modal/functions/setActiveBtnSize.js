import { sizesBtnGroup } from "../modalConstants";

export function setActiveBtnSize(targetBtn) {
  const prevActive = sizesBtnGroup.querySelector(
    ".modal-drink-params-btn.active"
  );
  if (prevActive) {
    prevActive.classList.remove("active");
    prevActive.disabled = false;
  }
  if (targetBtn) {
    targetBtn.classList.add("active");
    targetBtn.disabled = true;
  }
}
