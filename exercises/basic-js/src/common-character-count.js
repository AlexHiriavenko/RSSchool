const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(s1, s2) {
  let largestStr = s1.length >= s2.length ? s1 : s2;
  let smallestStr = largestStr === s1 ? s2 : s1;

  let count = 0;

  for (const char of largestStr) {
    if (smallestStr.includes(char)) {
      smallestStr = smallestStr.replace(char, "");
      count += 1;
    }
  }

  return count;
}

module.exports = {
  getCommonCharacterCount,
};
