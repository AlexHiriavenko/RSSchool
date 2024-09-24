const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(type = true) {
    this.type = type;
    this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  setKey(text, key) {
    let newKey = "";
    let keyChar = 0;

    for (let i = 0; i < text.length; i++) {
      if (this.alphabet.includes(text[i].toUpperCase())) {
        newKey += key[keyChar % key.length];
        keyChar++;
      } else {
        newKey += " ";
      }
    }

    return newKey.toUpperCase();
  }

  transformText(text, key, isEncrypting) {
    if (!(text && key)) {
      throw new Error("Incorrect arguments!");
    }

    text = text.toUpperCase();
    const newKey = this.setKey(text, key);
    const transformedText = [];

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (!this.alphabet.includes(char)) {
        transformedText.push(char);
        continue;
      }

      const alphabetIndex = this.alphabet.indexOf(char);
      const keyIndex = this.alphabet.indexOf(newKey[i]);

      let resultCharIndex =
        (isEncrypting
          ? alphabetIndex + keyIndex
          : 26 + alphabetIndex - keyIndex) % 26;

      transformedText.push(this.alphabet[resultCharIndex]);
    }

    return transformedText;
  }

  encrypt(text, key) {
    const encryptedText = this.transformText(text, key, true);
    return this.type
      ? encryptedText.join("")
      : encryptedText.reverse().join("");
  }

  decrypt(text, key) {
    const decryptedText = this.transformText(text, key, false);
    return this.type
      ? decryptedText.join("")
      : decryptedText.reverse().join("");
  }
}

module.exports = {
  VigenereCipheringMachine,
};
