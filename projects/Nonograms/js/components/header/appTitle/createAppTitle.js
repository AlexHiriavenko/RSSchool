export function createAppTitle() {
  const appTitle = document.createElement("h1");
  appTitle.className = "app-title";
  appTitle.textContent = "Nonograms";

  return appTitle;
}
