const digits = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
};

const teens = {
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen",
};

const tens = {
    10: "ten",
    20: "twenty",
    30: "thirty",
    40: "forty",
    50: "fifty",
    60: "sixty",
    70: "seventy",
    80: "eighty",
    90: "ninety",
};

module.exports = function toReadable(number) {
    if (!isNaN(number)) {
        number = typeof number === "number" ? number : +number;
        const str = number.toString();

        if (number < 10) {
            return digits[number];
        }
        if (number > 10 && number < 20) {
            return teens[number];
        }
        if (number < 100 && str.slice(-1) === "0") {
            return tens[number];
        } else if (number < 100) {
            return `${tens[str[0] + "0"]} ${digits[str[1]]}`;
        }
        if (number > 99 && str.slice(-2) === "00") {
            return `${digits[str[0]]} hundred`;
        }
        if (number > 100) {
            return `${digits[str[0]]} hundred ${toReadable(+str.slice(1))}`;
        }
        if (number > 999 || number < 0) {
            return "conversion error: entered number is greater than 999 or less than 0";
        }
    }
    return "Invalid input data or uknown error";
};
