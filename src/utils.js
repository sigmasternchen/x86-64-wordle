
export const range = (from, to) => {
    if (to === undefined) {
        return [...Array(from).keys()];
    } else {
        return [...Array(to - from).keys()].map(value => value + from);
    }
}

export const zip = (array1, array2) => array1.map((element, index) => [element, array2[index]]);

export const id = obj => obj;

export const objectMap = (obj, func) => {
    const result = {};
    for (let key in obj) {
        result[key] = func(obj[key], key);
    }
    return result;
}

export const makeEnum = values => {
    const obj = {};
    for (const value of values) {
        obj[value] = value;
    }
    return Object.freeze(obj);
}