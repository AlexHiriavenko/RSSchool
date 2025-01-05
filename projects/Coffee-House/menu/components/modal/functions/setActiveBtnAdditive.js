export function setActiveBtnAdditive(targetBtn) {
  targetBtn.matches(".active")
    ? targetBtn.classList.remove("active")
    : targetBtn.classList.add("active");
}
