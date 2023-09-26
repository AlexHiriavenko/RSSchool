import {
    containerModalRegister,
    modalRegister,
    btnCloseRegisterModal,
    linkToLogIn,
    containerModalLogIn,
    modalLogIn,
    logInOption,
} from "../variables/variables.js";
import { closeModal, openModal } from "./modals.js";

modalRegister.addEventListener("click", (e) => e.stopPropagation());

btnCloseRegisterModal.addEventListener("click", () =>
    closeModal(containerModalRegister, modalRegister)
);
containerModalRegister.addEventListener("click", () =>
    closeModal(containerModalRegister, modalRegister)
);

linkToLogIn.addEventListener("click", switchToLogIn);

function switchToLogIn() {
    closeModal(containerModalRegister, modalRegister);
    openModal(containerModalLogIn, modalLogIn, logInOption);
}
