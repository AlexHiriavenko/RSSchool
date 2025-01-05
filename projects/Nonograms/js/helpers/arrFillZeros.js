export function arrFillZeros(length = 0) {
  const innerArray = Array(length).fill(0);

  return Array(length)
    .fill(innerArray)
    .map((arr) => [...arr]);
}
