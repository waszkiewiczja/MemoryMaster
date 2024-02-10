import { LETTERS } from '@/types/game';

export const generateResultLetters = ({
    difficultyLevel,
    gameDuration,
}: {
    difficultyLevel: number;
    gameDuration: number;
}): string[] => {
    const result: string[] = [];
    for (let i = 0; i < gameDuration; i++) {
        result.push(LETTERS[Math.floor(Math.random() * difficultyLevel)]);
    }

    return result;
};

export const validateLetters = ({
    letters,
    difficultyLevel,
}: {
    letters: string[];
    difficultyLevel: number;
}): number => {
    let correctedLetterCount = 0;
    for (let i = 0; i < letters.length - difficultyLevel; i++) {
        if (letters[i] === letters[i + difficultyLevel]) {
            correctedLetterCount += 1;
        }
    }

    return correctedLetterCount;
};

export const getValidatedGeneratedLetters = ({
    difficultyLevel,
    gameDuration,
}: {
    difficultyLevel: number;
    gameDuration: number;
}): string[] => {
    let result: string[] = [];
    let correctedLetterCount: number = 0;

    const generateValidResultLetters = (): void => {
        result = generateResultLetters({ difficultyLevel, gameDuration });
        correctedLetterCount = validateLetters({
            difficultyLevel,
            letters: result,
        });
    };

    while (correctedLetterCount < difficultyLevel) {
        generateValidResultLetters();
    }

    return result;
};

export const getCorrectLetterArray = ({
    lettersArray,
    difficultyLevel,
}: {
    lettersArray: string[];
    difficultyLevel: number;
}): Array<string | undefined> => {
    const result: Array<string | undefined> = [];
    for (let i = 0; i < lettersArray.length; i++) {
        if (lettersArray[i - difficultyLevel] === lettersArray[i])
            result.push(lettersArray[i]);
        else {
            result.push(undefined);
        }
    }
    return result;
};

export const countCorrectLetterAnswers = (
    arr: Array<string | undefined>
): number => {
    const numbersOnly = arr.filter(
        (item): item is string => item !== undefined
    );

    return numbersOnly.length;
};

export const handleLetters = ({
    difficultyLevel,
    gameDuration,
}: {
    difficultyLevel: number;
    gameDuration: number;
}): {
    lettersArray: string[];
    correctLettersArray: (string | undefined)[];
    correctLetterCount: number;
} => {
    const lettersArray: string[] = getValidatedGeneratedLetters({
        difficultyLevel,
        gameDuration,
    });

    const correctLettersArray: (string | undefined)[] = getCorrectLetterArray({
        lettersArray,
        difficultyLevel,
    });

    const correctLetterCount: number =
        countCorrectLetterAnswers(correctLettersArray);

    return { lettersArray, correctLettersArray, correctLetterCount };
};
