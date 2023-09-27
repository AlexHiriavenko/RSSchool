import { loginMenu } from "../variables/variables.js";

export function closeModal(modalContainer, modal) {
    enableScroll();
    modal.classList.remove("active");
    modalContainer.classList.remove("active");
}

export function openModal(modalContainer, modal, dropMenuOption) {
    removeScroll();
    loginMenu.classList.remove("logIn-menu--active");
    modalContainer.classList.add("active");
    modal.classList.add("active");
    dropMenuOption.removeEventListener("click", openModal);
}

export function removeScroll() {
    document.body.style.overflow = "hidden";
}

export function enableScroll() {
    document.body.style.overflow = "auto";
}
