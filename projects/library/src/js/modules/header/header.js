import { btnBurger, navbarLinks } from "../variables/variables.js";
import toggleActive from "./addActive.js";
import setModalVisible from "./setModalVisible.js";

btnBurger.addEventListener("click", toggleActive);

for (const link of navbarLinks) {
    link.addEventListener("click", () => btnBurger.click());
}
