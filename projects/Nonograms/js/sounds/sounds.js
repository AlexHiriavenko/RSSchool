import { AppState } from "../AppState";

export const sounds = {
  turnSound: "./app-files/sounds/soundOn.wav",
  musicTrack1:
    "./app-files/sounds/alexander-nakarada-emotional-piano-improvisation.mp3",
  musicTrack2: "./app-files/sounds/alexander-nakarada-winter.mp3",
  easy: "./app-files/sounds/easy.wav",
  medium: "./app-files/sounds/medium.wav",
  hard: "./app-files/sounds/hard.mp3",
  newGame: "./app-files/sounds/newGame1.wav",
  startGame: "./app-files/sounds/startGame.wav",
  closeModal: "./app-files/sounds/close-modal.wav",
  chooseNonogram: "./app-files/sounds/choose-nonogram.wav",
  victory: "./app-files/sounds/victory.mp3",
  paintClick: "./app-files/sounds/paint-click.mp3",
  crossClick: "./app-files/sounds/cross-click.mp3",
  clearClick: "./app-files/sounds/clear-click.mp3",
  resetGame: "./app-files/sounds/reset3.wav",
  randomGame: "./app-files/sounds/randomGame.wav",
  showSolution: "./app-files/sounds/showSolution.wav",
};

export function playSound(path) {
  if (AppState.isSoundEffectsOn) {
    const audio = new Audio();
    audio.src = path;
    audio.play();
  }
}
