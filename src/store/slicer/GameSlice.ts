import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GameSlice = {
    squaresArray: number[];
    lettersArray: string[];
    correctPositionsArray: (number | undefined)[];
    correctLettersArray: (string | undefined)[];
    activePosition: number;
    activeLetter: string;
    correctAnswersCount: number;
    userPositionsAnswers: (number | undefined)[];
    userLetterAnswers: (string | undefined)[];
    currentRound: number;
};

const initialState: GameSlice = {
    squaresArray: [],
    lettersArray: [],
    correctPositionsArray: [],
    correctLettersArray: [],
    activePosition: -1,
    activeLetter: '',
    correctAnswersCount: 0,
    userPositionsAnswers: [],
    userLetterAnswers: [],
    currentRound: -1,
};

export const gameSlice = createSlice({
    name: 'gameSlice',
    initialState,
    reducers: {
        setSquaresArray: (state, actions: PayloadAction<number[]>) => {
            state.squaresArray = actions.payload;
        },
        setLettersArray: (state, actions: PayloadAction<string[]>) => {
            state.lettersArray = actions.payload;
        },
        setCorrectPositionsArray: (
            state,
            actions: PayloadAction<(number | undefined)[]>
        ) => {
            state.correctPositionsArray = actions.payload;
        },
        setCorrectLettersArray: (
            state,
            actions: PayloadAction<Array<string | undefined>>
        ) => {
            state.correctLettersArray = actions.payload;
        },
        setActivePosition: (state, actions: PayloadAction<number>) => {
            state.activePosition = actions.payload;
        },
        setActiveLetter: (state, actions: PayloadAction<string>) => {
            state.activeLetter = actions.payload;
        },
        setCorrectAnswersCount: (state, actions: PayloadAction<number>) => {
            state.correctAnswersCount += actions.payload;
        },
        addToUserPositionsAnswers: (
            state,
            actions: PayloadAction<number | undefined>
        ) => {
            state.userPositionsAnswers = [
                ...state.userPositionsAnswers,
                actions.payload,
            ];
        },
        addToUserLettersAnswers: (
            state,
            actions: PayloadAction<string | undefined>
        ) => {
            state.userLetterAnswers = [
                ...state.userLetterAnswers,
                actions.payload,
            ];
        },
        resetCurrentAnswers: (state) => {
            state.userPositionsAnswers = [];
            state.userLetterAnswers = [];
        },
        resetCurrentRound: (state) => {
            state.currentRound = -1;
        },
        increaseCurrentRound: (state) => {
            state.currentRound = state.currentRound + 1;
        },
    },
});

export const {
    setSquaresArray,
    setLettersArray,
    setCorrectPositionsArray,
    setCorrectLettersArray,
    setActivePosition,
    setActiveLetter,
    setCorrectAnswersCount,
    addToUserPositionsAnswers,
    addToUserLettersAnswers,
    resetCurrentAnswers,
    resetCurrentRound,
    increaseCurrentRound,
} = gameSlice.actions;
export default gameSlice.reducer;
