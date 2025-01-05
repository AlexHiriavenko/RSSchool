import { alphabet } from "../alphabet";

function onKeyDown(event, keyboardBtns) {
  const pressedKey = event.key.toLowerCase();
  const keyAnyLang = event.code.slice(3).toLowerCase();

  const notLatinKey =
    alphabet.includes(keyAnyLang) && pressedKey !== keyAnyLang;

  if (notLatinKey) {
    alert("Please use the Latin keyboard layout.");
  }

  if (alphabet.includes(pressedKey)) {
    const virtualKey = keyboardBtns.find(
      (key) => key.textContent === pressedKey.toUpperCase(),
    );
    virtualKey?.click();
  }
}

export default onKeyDown;
