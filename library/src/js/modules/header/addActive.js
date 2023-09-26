import { navbar } from "../variables/variables.js";
import setModalVisible from "./setModalVisible.js";

export default function toggleActive(event) {
    const target = event.target.closest("button");
    const activeBurger = "btn-burger--active";
    const activeNavbar = "header__nav--active";

    const isActive = target.matches("." + activeBurger);

    if (isActive) {
        target.classList.remove(activeBurger);
        navbar.classList.remove(activeNavbar);
    } else {
        target.classList.add(activeBurger);
        navbar.classList.add(activeNavbar);
        document.body.addEventListener("click", setModalVisible);
    }
}
