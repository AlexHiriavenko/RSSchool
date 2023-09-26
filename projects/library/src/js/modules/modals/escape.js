import { closeModal } from "./modals.js";
import {
    containerModalLogIn,
    containerModalRegister,
    modalLogIn,
    modalRegister,
    loginMenu,
} from "../variables/variables.js";

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal(containerModalLogIn, modalLogIn);
        closeModal(containerModalRegister, modalRegister);
        loginMenu.classList.remove("logIn-menu--active");
    }
});
