import { btnCloseModal, modalContainer } from "./modalConstants.js";
import { closeModal } from "./functions/closeModal.js";

btnCloseModal.addEventListener("click", closeModal);
modalContainer.addEventListener("click", closeModal);
