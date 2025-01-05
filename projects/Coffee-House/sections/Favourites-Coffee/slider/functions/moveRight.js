import { slider } from "../slideConstants";
import {
  progressBar1,
  progressBar2,
  progressBar3,
} from "../../pagination/paginationConstants";
import { timeParams, progressBarState } from "../sliderSettings";
import { resumeProgressBar } from "./resumeProgressBar";

export function moveRight() {
  timeParams.startTime = Date.now();
  timeParams.limit = 4000;
  progressBarState.width = 0;

  if (slider.matches(".start")) {
    slider.classList.replace("start", "end");

    progressBar1.style.width = 0;
    progressBarState.currentProgressBar = progressBar3;
    resumeProgressBar(progressBar3);
  } else if (slider.matches(".mid")) {
    slider.classList.replace("mid", "start");

    progressBar2.style.width = 0;
    progressBarState.currentProgressBar = progressBar1;
    resumeProgressBar(progressBar1);
  } else if (slider.matches(".end")) {
    slider.classList.replace("end", "mid");

    progressBar3.style.width = 0;
    progressBarState.currentProgressBar = progressBar2;
    resumeProgressBar(progressBar2);
  }
}
