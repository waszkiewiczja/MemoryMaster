export const countMatchingStrings = (
    array1: (string | undefined)[],
    array2: (string | undefined)[]
): number => {
    const minLength = Math.min(array1.length, array2.length);

    let count = 0;

    for (let i = 0; i < minLength; i++) {
        if (
            typeof array1[i] === 'string' &&
            typeof array2[i] === 'string' &&
            array1[i] === array2[i]
        ) {
            count++;
        }
    }

    return count;
};

export const countMatchingNumbers = (
    array1: (number | undefined)[],
    array2: (number | undefined)[]
): number => {
    const minLength = Math.min(array1.length, array2.length);

    let count = 0;

    for (let i = 0; i < minLength; i++) {
        if (
            typeof array1[i] === 'number' &&
            typeof array2[i] === 'number' &&
            array1[i] === array2[i]
        ) {
            count++;
        }
    }

    return count;
};
