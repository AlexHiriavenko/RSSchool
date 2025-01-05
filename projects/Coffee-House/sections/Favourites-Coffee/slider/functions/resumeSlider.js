import { sliderState, timeParams } from "../sliderSettings";
import { moveLeft } from "./moveLeft";

export function resumeSlider() {
  timeParams.startTime = Date.now();
  sliderState.interval = setTimeout(() => {
    moveLeft();
    sliderState.interval = setInterval(moveLeft, 4000);
  }, timeParams.remainingTime);
}
