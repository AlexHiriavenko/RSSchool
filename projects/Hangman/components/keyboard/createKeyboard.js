import { alphabet } from "./alphabet";

function createKeyboard() {
  const keyboard = document.createElement("ul");
  keyboard.className = "keyboard";

  const keyboardBtns = alphabet.map((letter) => {
    const key = document.createElement("li");
    key.className = "keyboard__key";
    key.textContent = letter.toUpperCase();
    return key;
  });

  keyboard.append(...keyboardBtns);
  return { keyboard: keyboard, keyboardBtns: keyboardBtns };
}

export default createKeyboard;
