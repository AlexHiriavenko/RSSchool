import { btnSliderLeft, btnSliderRight } from "./slideConstants";
import { progressBar1 } from "../pagination/paginationConstants.js";
import { moveLeft } from "./functions/moveLeft.js";
import { moveRight } from "./functions/moveRight.js";
import { sliderImages } from "./slideConstants";
import { pauseSlider } from "./functions/puseSlider.js";
import { resumeSlider } from "./functions/resumeSlider.js";
import { resumeProgressBar } from "./functions/resumeProgressBar.js";
import { pauseProgressBar } from "./functions/pauseProgressBar.js";
import { sliderState, progressBarState } from "./sliderSettings.js";

btnSliderLeft.addEventListener("click", function () {
  clearInterval(sliderState.interval);
  moveRight();
  sliderState.interval = setInterval(moveLeft, 4000);
});

btnSliderRight.addEventListener("click", function () {
  clearInterval(sliderState.interval);
  moveLeft();
  sliderState.interval = setInterval(moveLeft, 4000);
});

for (const img of sliderImages) {
  img.addEventListener("mouseover", () => {
    pauseSlider();
    pauseProgressBar();
  });
  img.addEventListener("mouseout", () => {
    resumeSlider();
    resumeProgressBar(progressBarState.currentProgressBar);
  });
}

sliderState.interval = setInterval(moveLeft, 4000);

resumeProgressBar(progressBar1);
