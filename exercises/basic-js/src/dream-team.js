const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create name of dream team based on the names of its members
 *
 * @param {Array} members names of the members
 * @return {String | Boolean} name of the team or false
 * in case of incorrect members
 *
 * @example
 *
 * createDreamTeam(['Matt', 'Ann', 'Dmitry', 'Max']) => 'ADMM'
 * createDreamTeam(['Olivia', 1111, 'Lily', 'Oscar', true, null]) => 'LOO'
 *
 */
function createDreamTeam(members) {
  if (!Array.isArray(members)) {
    return false;
  }

  function isValidName(name) {
    return (
      typeof name === "string" &&
      name.trim()[0].toUpperCase() !== name.trim()[0].toLowerCase()
    );
  }

  const firstLetters = members
    .filter((name) => isValidName(name))
    .map((name) => name.trim()[0].toUpperCase());

  if (firstLetters.length) return firstLetters.sort().join("");
  else return false;
}

module.exports = {
  createDreamTeam,
};
