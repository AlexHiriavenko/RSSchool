const enjoyText = document.querySelector(".enjoy__description");

document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("bg-video");
  if (video) {
    video.addEventListener("timeupdate", function () {
      if (video.currentTime >= 21 && video.currentTime <= 28) {
        enjoyText.style.color = "#e2c5b1";
      } else {
        enjoyText.style.color = "#e1d4c9";
      }
    });
  }
});
