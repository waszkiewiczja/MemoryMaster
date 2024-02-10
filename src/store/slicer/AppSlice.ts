import { GameStatus } from '@/types/game';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppSlice = {
    difficultyLevel: number;
    gameDuration: number;
    gameStatus: GameStatus;
    prevResults: number[];
};

const initialState: AppSlice = {
    difficultyLevel: 2,
    gameDuration: 10,
    gameStatus: GameStatus.TO_START,
    prevResults: [],
};

export const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        setActiveStatus: (state) => {
            state.gameStatus = GameStatus.ACTIVE;
        },
        setFinishedStatus: (state) => {
            state.gameStatus = GameStatus.FINISHED;
        },
        updateDifficultyLevel: (state, actions: PayloadAction<number>) => {
            if (actions.payload === -1 && state.difficultyLevel > 2) {
                state.gameDuration =
                    3 + (state.difficultyLevel + actions.payload) * 4;
                state.difficultyLevel = state.difficultyLevel + actions.payload;
            }
            if (actions.payload === 1 && state.difficultyLevel < 8) {
                state.gameDuration =
                    3 + (state.difficultyLevel + actions.payload) * 4;
                state.difficultyLevel = state.difficultyLevel + actions.payload;
            }
        },
        setDifficultyLevel: (state, actions: PayloadAction<number>) => {
            if (actions.payload >= 2 && actions.payload <= 8)
                state.difficultyLevel = actions.payload;
        },
    },
});

export const {
    setActiveStatus,
    setFinishedStatus,
    updateDifficultyLevel,
    setDifficultyLevel,
} = appSlice.actions;
export default appSlice.reducer;
