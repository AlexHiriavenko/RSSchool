import { progressBarState } from "../sliderSettings";

export function resumeProgressBar(progressBar) {
  if (progressBar) {
    clearInterval(progressBarState.interval);
    progressBarState.interval = setInterval(frame, 100);

    function frame() {
      if (progressBarState.width >= 40) {
        clearInterval(progressBarState.interval);
      } else {
        progressBarState.width += 1;
        progressBar.style.width = progressBarState.width + "px";
      }
    }
  }
}
