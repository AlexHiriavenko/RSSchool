import { progressBarState } from "../sliderSettings";

export function pauseProgressBar() {
  clearInterval(progressBarState.interval);
}
