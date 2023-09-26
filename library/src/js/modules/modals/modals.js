import { loginMenu } from "../variables/variables.js";

export function closeModal(modalContainer, modal) {
    modal.classList.remove("active");
    modalContainer.classList.remove("active");
}

export function openModal(modalContainer, modal, dropMenuOption) {
    loginMenu.classList.remove("logIn-menu--active");
    modalContainer.classList.add("active");
    modal.classList.add("active");
    dropMenuOption.removeEventListener("click", openModal);
}
