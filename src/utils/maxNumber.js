export function maxNumber(array) {
    const values = array.map((object, index) => Object.values(object));
    const mergedValues = values.reduce((a, b) => a.concat(b), []);
    return Math.max(...mergedValues);
};