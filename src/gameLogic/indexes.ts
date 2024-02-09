export const generateResultIndexes = ({
    difficultyLevel,
    gameDuration,
}: {
    difficultyLevel: number;
    gameDuration: number;
}): number[] => {
    if (difficultyLevel > gameDuration) {
        throw new Error(
            'Difficulty level cannot be greater than game duration'
        );
    }
    console.log(
        'gameDuration',
        gameDuration,
        'difficultyLevel',
        difficultyLevel
    );
    let result: number[] = [];
    const validIndex: number = gameDuration - difficultyLevel;

    while (result.length < difficultyLevel) {
        const randomIndex: number =
            Math.floor(Math.random() * validIndex) + difficultyLevel;
        console.log(randomIndex, result, result.length);
        if (!result.includes(randomIndex)) {
            result.push(randomIndex);
        }
        console.log(randomIndex, result, result.length);
    }

    return result.sort((a, b) => a - b);
};

export const validateIncrement = (arr: number[], constant: number): boolean => {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[i - 1] + constant) {
            return false;
        }
    }
    return true;
};

export const getValidatedGeneratedResults = ({
    difficultyLevel,
    gameDuration,
}: {
    difficultyLevel: number;
    gameDuration: number;
}): number[] => {
    let validatedResult = false;
    let result: number[] = [];
    while (!validatedResult) {
        result = generateResultIndexes({ difficultyLevel, gameDuration });
        validatedResult = !validateIncrement(result, difficultyLevel);
    }

    return result;
};
