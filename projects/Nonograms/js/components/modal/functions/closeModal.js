import { modal, gameInterface } from "../../../App";
import { setScroll } from "../../../helpers/setScroll";

export function closeModal() {
  setScroll("on");
  modal.darkSpace.classList.remove("active");
  modal.modalWindow.classList.remove(
    "active",
    "victory",
    "alert",
    "confirm",
    "records-bg",
  );
  modal.contentContainer.innerHTML = "";

  gameInterface.btnGroup.style.pointerEvents = "all";
}
