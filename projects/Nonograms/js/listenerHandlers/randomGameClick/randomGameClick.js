import { openModal } from "../../components/modal/functions/openModal";
import { modal } from "../../App";
import { createRandomGameForm } from "./randomGameForm";

export function randomGameClick() {
  const randomGameForm = createRandomGameForm().form;
  modal.modalWindow.classList.add("confirm");
  openModal(randomGameForm);
}
