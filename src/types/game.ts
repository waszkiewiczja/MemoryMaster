export const SQUARE_COUNT = 9;

export enum GameStatus {
    TO_START = 'To start',
    ACTIVE = 'Active',
    FINISHED = 'Finished',
}

export enum SquareLetters {
    A = 'a',
    B = 'b',
    C = 'c',
    D = 'd',
    E = 'e',
    F = 'f',
    G = 'g',
    H = 'h',
    I = 'i',
}

export const LETTERS: string[] = Object.values(SquareLetters);

export enum LetterColors {}
