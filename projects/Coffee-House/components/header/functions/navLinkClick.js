import { closeBurger } from "./closeBurger";
import { switchLocationDelay } from "./switchLocationDelay";

export function navLinkClick(event) {
  event.preventDefault();
  closeBurger();
  switchLocationDelay(event);
}
