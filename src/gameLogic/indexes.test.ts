import { generateResultIndexes } from './indexes';

describe('indexes', () => {
    describe('generateResultIndexes', () => {
        it('generates an array with correct length', () => {
            const difficultyLevel = 2;
            const gameDuration = 10;

            const result = generateResultIndexes({
                difficultyLevel,
                gameDuration,
            });

            expect(result.length).toBe(difficultyLevel);
        });

        it('generates indexes within the valid range', () => {
            const difficultyLevel = 4;
            const gameDuration = 20;

            const result = generateResultIndexes({
                difficultyLevel,
                gameDuration,
            });

            result.forEach((index) => {
                expect(index).toBeGreaterThanOrEqual(difficultyLevel);
                expect(index).toBeLessThanOrEqual(gameDuration);
            });
        });
    });
});
