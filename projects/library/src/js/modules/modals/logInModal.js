import {
    btnCloseLogInModal,
    containerModalLogIn,
    modalLogIn,
    linkToRegister,
    containerModalRegister,
    modalRegister,
    registerOption,
} from "../variables/variables.js";
import { closeModal, openModal } from "./modals.js";

modalLogIn.addEventListener("click", (e) => e.stopPropagation());

btnCloseLogInModal.addEventListener("click", () => closeModal(containerModalLogIn, modalLogIn));
containerModalLogIn.addEventListener("click", () => closeModal(containerModalLogIn, modalLogIn));

linkToRegister.addEventListener("click", switchToRgister);

function switchToRgister() {
    closeModal(containerModalLogIn, modalLogIn);
    openModal(containerModalRegister, modalRegister, registerOption);
}
