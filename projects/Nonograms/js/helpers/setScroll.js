export function setScroll(flag = "on") {
  document.body.style.overflow = flag === "off" ? "hidden" : "auto";
}
