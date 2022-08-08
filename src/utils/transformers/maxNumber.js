export default function maxNumber(array, keys) {
  const values = array.map((object, index) =>
    keys.map((key, index) => object[key])
  );
  const mergedValues = values.reduce((a, b) => a.concat(b), []);
  const max = Math.max(...mergedValues);
  return roundNumber(max);
}

function roundNumber(number) {
  return Math.ceil(number / 100) * 100;
}
