import { generateResultIndexes } from './indexes';
import { getCorrectPositionAnswers } from './positions';

jest.mock('./indexes', () => ({
    generateResultIndexes: jest.fn(),
}));

describe('getNumbersResults', () => {
    it('generates an array with correct length', () => {
        const difficultyLevel = 2;
        const gameDuration = 10;

        const result = getCorrectPositionAnswers({
            difficultyLevel,
            gameDuration,
        });

        expect(result).toHaveLength(gameDuration);
    });

    it('generates results with numbers and undefined based on difficultyLevel and gameDuration', () => {
        (generateResultIndexes as jest.Mock).mockReturnValueOnce(
            new Set([2, 7])
        );

        const result = getCorrectPositionAnswers({
            difficultyLevel: 2,
            gameDuration: 10,
        });

        expect(result).toStrictEqual([
            undefined,
            undefined,
            2,
            undefined,
            undefined,
            undefined,
            undefined,
            7,
            undefined,
            undefined,
        ]);
    });
});
