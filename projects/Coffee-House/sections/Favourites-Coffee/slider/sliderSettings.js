import { progressBar1 } from "../pagination/paginationConstants";

export const sliderState = {
  interval: null,
};

export const progressBarState = {
  interval: null,
  currentProgressBar: progressBar1,
  width: 0,
};

export const timeParams = {
  remainingTime: 0,
  startTime: Date.now(),
  limit: 4000,
};
