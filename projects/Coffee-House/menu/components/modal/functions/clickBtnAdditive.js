import { setActiveBtnAdditive } from "./setActiveBtnAdditive";
import { setAdditivePrice } from "./setAdditivePrice";

export function clickBtnAdditive(event) {
  const targetBtn = event.target.closest("button");
  if (targetBtn) {
    setActiveBtnAdditive(targetBtn);
    setAdditivePrice(targetBtn);
  }
}
