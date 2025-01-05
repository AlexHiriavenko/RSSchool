import { AppState } from "../../../../AppState";

const audio1 = new Audio();
audio1.src =
  "./app-files/sounds/alexander-nakarada-emotional-piano-improvisation.mp3";

const audio2 = new Audio();
audio2.src = "./app-files/sounds/alexander-nakarada-winter.mp3";

// Функция для запуска воспроизведения следующего трека
function playNextTrack() {
  if (AppState.currentTrack) {
    AppState.currentTrack = AppState.currentTrack === audio2 ? audio1 : audio2;
    AppState.currentTrack.play();
    AppState.currentTrack.removeEventListener("ended", playNextTrack);
    AppState.currentTrack.addEventListener("ended", playNextTrack);
  }
}

// Функция для включения/выключения музыки
export function toggleMusic(event) {
  AppState.isMusicOn = !AppState.isMusicOn;
  if (!AppState.isMusicOn) {
    if (AppState.currentTrack) {
      AppState.currentTrack.pause();
      AppState.currentTrack.removeEventListener("ended", playNextTrack);
    }
  } else {
    if (!AppState.currentTrack) {
      AppState.currentTrack = audio1;
    }
    AppState.currentTrack.play();
    AppState.currentTrack.addEventListener("ended", playNextTrack);
  }
  event.currentTarget.classList.toggle("off");
}
