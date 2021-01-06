export const round = (number, decimals) => {
    const decimalsMultiplier = Math.pow(10, decimals);
    return Math.floor(number*decimalsMultiplier)/decimalsMultiplier
}

export const classBag = (...classes) => {
    return classes.filter(clazz => !!clazz).join(" ");
}
