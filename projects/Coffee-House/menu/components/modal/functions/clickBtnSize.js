import { setActiveBtnSize } from "./setActiveBtnSize.js";
import { setSizePrice } from "./setSizePrice.js";

export function clickBtnSize(event) {
  const targetBtn = event.target.closest("button");
  if (targetBtn) {
    setActiveBtnSize(targetBtn);
    setSizePrice(targetBtn);
  }
}
