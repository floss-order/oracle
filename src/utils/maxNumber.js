export function maxNumber(array, keys) {
    const values = array.map((object, index) => keys.map((key, index) => object[key]));
    const mergedValues = values.reduce((a, b) => a.concat(b), []);
    return Math.max(...mergedValues);
};