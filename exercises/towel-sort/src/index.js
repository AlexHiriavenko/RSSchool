// You should implement your task here.

module.exports = function towelSort(matrix) {
    return arguments.length
        ? matrix.reduce((acc, val, i) => {
              i % 2 === 0 ? acc.push(...val) : acc.push(...val.reverse());
              return acc;
          }, [])
        : [];
};
