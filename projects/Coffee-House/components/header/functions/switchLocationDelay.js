export function switchLocationDelay(event) {
  const target = event.target.closest("a");
  setTimeout(() => {
    window.location.href = target.href;
  }, 700);
}
