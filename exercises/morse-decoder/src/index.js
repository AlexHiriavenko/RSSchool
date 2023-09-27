const MORSE_TABLE = {
    ".-": "a",
    "-...": "b",
    "-.-.": "c",
    "-..": "d",
    ".": "e",
    "..-.": "f",
    "--.": "g",
    "....": "h",
    "..": "i",
    ".---": "j",
    "-.-": "k",
    ".-..": "l",
    "--": "m",
    "-.": "n",
    "---": "o",
    ".--.": "p",
    "--.-": "q",
    ".-.": "r",
    "...": "s",
    "-": "t",
    "..-": "u",
    "...-": "v",
    ".--": "w",
    "-..-": "x",
    "-.--": "y",
    "--..": "z",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",
    "-----": "0",
};

function decode(expr) {
    const morseCodeWords = expr.trim().split("**********");
    const decodedWords = morseCodeWords.map((morseCodeWord) => {
        const morseCodeChars = morseCodeWord.match(/.{1,10}/g) || [];
        const decodedChars = morseCodeChars.map((morseCodeChar) => {
            const morseCode = morseCodeChar
                .replace(/00/g, "")
                .replace(/10/g, ".")
                .replace(/11/g, "-");
            return MORSE_TABLE[morseCode] || "";
        });
        return decodedChars.join("");
    });
    return decodedWords.join(" ");
}

module.exports = {
    decode,
};
