import { timeParams, sliderState } from "../sliderSettings";

export function pauseSlider() {
  clearInterval(sliderState.interval);
  const hoverTime = Date.now();
  timeParams.remainingTime =
    timeParams.limit - (hoverTime - timeParams.startTime);
  timeParams.limit = timeParams.remainingTime;
}
