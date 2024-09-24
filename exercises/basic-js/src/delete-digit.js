const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  const numbers = n.toString().split("");
  let numbersCases = [];

  function generateCase(i) {
    let numberCase = numbers.slice(0, i).concat(numbers.slice(i + 1));
    numberCase = +numberCase.join("");
    numbersCases.push(numberCase);
  }

  numbers.forEach((_, i) => {
    generateCase(i);
  });

  const maxNumber = Math.max(...numbersCases);

  return maxNumber;
}

module.exports = {
  deleteDigit,
};
