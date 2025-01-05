import { TimerHTML } from "../../components/timer/timer";
import { formatTime } from "../../helpers/formatTime";

let timerInterval;

export function startTimer(timerValue = 0) {
  console.log(timerValue);
  timerInterval = setInterval(() => {
    timerValue += 1;
    TimerHTML.timerDisplay.textContent = formatTime(timerValue);
    localStorage.setItem("timer", timerValue);
  }, 1000);
}

export function stopTimer() {
  clearInterval(timerInterval);
}

export function clearTimer() {
  stopTimer();
  TimerHTML.timerDisplay.textContent = "00:00";
  localStorage.setItem("timer", 0);
}
