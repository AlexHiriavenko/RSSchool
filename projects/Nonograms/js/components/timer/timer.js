function createTimer() {
  const timerSection = document.createElement("p");
  timerSection.textContent = "TIMER: ";
  timerSection.className = "timer-section";

  const timerDisplay = document.createElement("span");
  timerDisplay.textContent = Number(localStorage.getItem("timer")) || 0;

  timerSection.append(timerDisplay);

  return {
    timerSection: timerSection,
    timerDisplay: timerDisplay,
  };
}

export const TimerHTML = createTimer();
