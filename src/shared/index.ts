
export const extend = Object.assign;

export const hasChanged = (val, newValue) => {
    return !Object.is(val, newValue)
}

export const hasOwn = (val, key) =>
    Object.prototype.hasOwnProperty.call(val, key)