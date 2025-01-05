import { closeModal } from "./closeModal";

export function escapeKeyCloseModal(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}
