function createPreview() {
  const appContainer = document.createElement("div");
  appContainer.classList.add("app-preview");

  const wrap = document.createElement("div");
  wrap.className = "preview-wrap";

  const title = document.createElement("h1");
  title.classList.add("app__title");
  const titleImg = document.createElement("img");
  titleImg.classList.add("main-title__img");
  titleImg.src = "./imgs/general/title1.png";
  titleImg.alt = "the Hangman game";
  titleImg.width = "310";
  title.appendChild(titleImg);

  const playButton = document.createElement("button");
  playButton.classList.add("start-game");
  playButton.textContent = "Play";

  const bannerImg = document.createElement("img");
  bannerImg.classList.add("app__banner");
  bannerImg.src = "./imgs/general/preview.gif";
  bannerImg.alt = "funny manikin gif";
  bannerImg.width = "280";

  wrap.appendChild(title);
  wrap.appendChild(playButton);
  appContainer.appendChild(wrap);
  appContainer.appendChild(bannerImg);

  return {
    appContainer: appContainer,
    playButton: playButton,
  };
}

export default createPreview;
