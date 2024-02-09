import { configureStore } from '@reduxjs/toolkit';
import { appSlice } from './slicer/AppSlice';
import { gameSlice } from './slicer/GameSlice';

export const store = configureStore({
    reducer: {
        appSlice: appSlice.reducer,
        gameSlice: gameSlice.reducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
