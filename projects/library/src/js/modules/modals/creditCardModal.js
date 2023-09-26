import {
    containerModalCreditCard,
    modalCreditCard,
    btnCloseCreditModal,
} from "../variables/variables.js";
import { closeModal } from "./modals.js";

modalCreditCard.addEventListener("click", (e) => e.stopPropagation());

btnCloseCreditModal.addEventListener("click", () =>
    closeModal(containerModalCreditCard, modalCreditCard)
);
containerModalCreditCard.addEventListener("click", () =>
    closeModal(containerModalCreditCard, modalCreditCard)
);
