const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given matrix, a rectangular matrix of integers,
 * just add up all the values that don't appear below a "0".
 *
 * @param {Array<Array>} matrix
 * @return {Number}
 *
 * @example
 * matrix = [
 *  [0, 1, 1, 2],
 *  [0, 5, 0, 0],
 *  [2, 0, 3, 3]
 * ]
 *
 * The result should be 9
 */
function getMatrixElementsSum(matrix) {
  const [firstArray = [], secondArray = [], thirdArray = []] = matrix;

  if (
    !Array.isArray(firstArray) ||
    !Array.isArray(secondArray) ||
    !Array.isArray(thirdArray)
  ) {
    return 0;
  }
  const sumFirstArray = firstArray.reduce((acc, val) => acc + val, 0);

  const sumSecondArray = secondArray.reduce((acc, val, idx) => {
    if (firstArray[idx] > 0) {
      return acc + val;
    }
    return acc;
  }, 0);

  const sumThirdArray = thirdArray.reduce((acc, val, idx) => {
    if (firstArray[idx] > 0 && secondArray[idx] > 0) {
      return acc + val;
    }
    return acc;
  }, 0);

  return sumFirstArray + sumSecondArray + sumThirdArray;
}

module.exports = {
  getMatrixElementsSum,
};
