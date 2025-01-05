import { AppState } from "../../../AppState";
import { musicIcon } from "../../SVG/musicIcon";
import { soundsIcon } from "../../SVG/soundIcon";
import { toggleMusic } from "./functions/toggleMusic";
import { toggleSoundEffects } from "./functions/toggleSoundEffects";
import { toggleDisplayMode } from "./functions/toggleDisplayMode";

export function createHeaderBtns() {
  const containerBtns = document.createElement("div");

  const turnMusic = document.createElement("button");
  const turnSounds = document.createElement("button");

  containerBtns.className = "header__btn-group";
  turnMusic.className = "header__btn turn-music off";
  turnSounds.className = "header__btn turn-sounds off";
  turnMusic.title = "Music";
  turnSounds.title = "Sound Effects";

  turnMusic.innerHTML = musicIcon;
  turnSounds.innerHTML = soundsIcon;

  const switchThemeLabel = document.createElement("label");
  const switchThemeInput = document.createElement("input");
  const switchThemeSpan = document.createElement("span");

  switchThemeLabel.className = "switch-theme__label";
  switchThemeInput.className = "switch-theme__input";
  switchThemeSpan.className = "switch-theme__span";

  switchThemeInput.type = "checkbox";
  switchThemeLabel.title = "Display Mode";
  if (AppState.darkMode === "on") {
    document.documentElement.classList.replace("light", "dark");
    switchThemeInput.checked = true;
  } else {
    document.documentElement.classList.replace("dark", "light");
    switchThemeInput.checked = false;
  }

  switchThemeLabel.append(switchThemeInput, switchThemeSpan);

  turnMusic.addEventListener("click", toggleMusic);
  turnSounds.addEventListener("click", toggleSoundEffects);
  switchThemeInput.addEventListener("change", toggleDisplayMode);

  containerBtns.append(turnMusic, turnSounds, switchThemeLabel);

  return {
    containerBtns: containerBtns,
    turnMusic: turnMusic,
    turnSounds: turnSounds,
    switchThemeInput: switchThemeInput,
  };
}
