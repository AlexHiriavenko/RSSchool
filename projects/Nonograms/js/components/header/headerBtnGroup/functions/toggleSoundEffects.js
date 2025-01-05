import { AppState } from "../../../../AppState";
import { sounds, playSound } from "../../../../sounds/sounds";

export function toggleSoundEffects(event) {
  AppState.isSoundEffectsOn = !AppState.isSoundEffectsOn;
  event.currentTarget.classList.toggle("off");
  playSound(sounds.turnSound);
}
