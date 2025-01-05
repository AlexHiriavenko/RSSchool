function createGallowsImg() {
  const gallowsImg = document.createElement("img");
  gallowsImg.className = "gallows__img";
  gallowsImg.src = "./imgs/gallows/gallows.jpg";
  gallowsImg.alt = "gallows";
  gallowsImg.width = 200;
  return gallowsImg;
}

export default createGallowsImg;
