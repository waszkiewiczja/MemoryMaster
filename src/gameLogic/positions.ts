import { getValidatedGeneratedResults } from './indexes';

export const generateRandomArray = (gameDuration: number): number[] => {
    const result: number[] = [];

    for (let i = 0; i < gameDuration; i++) {
        result.push(Math.floor(Math.random() * 9));
    }
    return result;
};

export const getSquaresArray = ({
    resultIndexes,
    difficultyLevel,
    gameDuration,
}: {
    resultIndexes: number[];
    difficultyLevel: number;
    gameDuration: number;
}): number[] => {
    const result: number[] = generateRandomArray(gameDuration);

    resultIndexes.map((index) => {
        if (resultIndexes[index] === resultIndexes[index + difficultyLevel]) {
            const random = Math.floor(Math.random() * 9);
            result[index - difficultyLevel] = random;
            result[index] = random;
        }
    });
    return result;
};

export const getCorrectPositionArray = ({
    squaresArray,
    difficultyLevel,
}: {
    squaresArray: number[];
    difficultyLevel: number;
}): Array<number | undefined> => {
    const result: Array<number | undefined> = [];
    for (let i = 0; i < squaresArray.length; i++) {
        if (squaresArray[i - difficultyLevel] === squaresArray[i])
            result.push(squaresArray[i]);
        else {
            result.push(undefined);
        }
    }
    return result;
};

export const countCorrectPositionAnswers = (
    arr: Array<number | undefined>
): number => {
    const numbersOnly = arr.filter(
        (item): item is number => item !== undefined
    );

    return numbersOnly.length;
};

export const handlePositions = ({
    difficultyLevel,
    gameDuration,
}: {
    difficultyLevel: number;
    gameDuration: number;
}): {
    squaresArray: number[];
    correctPositionsArray: (number | undefined)[];
    correctPositionCount: number;
} => {
    const resultIndexes: number[] = getValidatedGeneratedResults({
        difficultyLevel,
        gameDuration,
    });

    const squaresArray: number[] = getSquaresArray({
        resultIndexes,
        gameDuration,
        difficultyLevel,
    });

    const correctPositionsArray: (number | undefined)[] =
        getCorrectPositionArray({
            squaresArray,
            difficultyLevel,
        });

    const correctPositionCount: number = countCorrectPositionAnswers(
        correctPositionsArray
    );

    return { squaresArray, correctPositionsArray, correctPositionCount };
};
