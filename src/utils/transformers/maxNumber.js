export default function maxNumber(array, keys) {
  const values = array.map((object, index) =>
    keys.map((key, index) => object[key])
  );
  const mergedValues = values.reduce((a, b) => a.concat(b), []);
  const max = Math.max(...mergedValues);
  return roundNumber(max);
}

export function minNumber(array, keys) {
  const values = array.map(object => keys.map(key => object[key]));
  const mergedValues = values.reduce((a, b) => a.concat(b), []);
  const min = Math.min(...mergedValues);
  return roundNumber(min);
}

function roundNumber(number) {
  return Math.ceil(number / 100) * 100;
}
