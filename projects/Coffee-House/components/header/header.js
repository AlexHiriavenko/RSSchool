import { navLinks, headerBurgerBtn } from "./headerConstansts";
import { toggleBurgerState } from "./functions/toggleBurgerState";
import { navLinkClick } from "./functions/navLinkClick";

headerBurgerBtn.addEventListener("click", toggleBurgerState);

for (const link of navLinks) {
  link.addEventListener("click", navLinkClick);
}
