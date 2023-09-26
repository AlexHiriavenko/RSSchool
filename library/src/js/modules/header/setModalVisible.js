import { btnBurger, navbar } from "../variables/variables.js";

function setModalVisible(event) {
    console.log("test");
    const isModal = event.target.closest(".header__nav");
    const isBtnBurger = event.target.closest(".btn-burger");
    if (!isModal && !isBtnBurger) {
        btnBurger.classList.remove("btn-burger--active");
        navbar.classList.remove("header__nav--active");
        document.body.removeEventListener("click", setModalVisible);
    }
}

export default setModalVisible;
