function createLogo() {
  const logo = document.createElement("img");
  logo.className = "game-logo";
  logo.src = "./imgs/general/title1.png";
  logo.alt = "game logo";
  logo.width = 200;
  return logo;
}

export default createLogo;
