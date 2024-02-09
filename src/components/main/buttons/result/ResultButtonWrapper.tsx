import { memo, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { RootState } from '@/store';
import { countCorrectLetterAnswers } from '@/gameLogic/letters';
import { countCorrectPositionAnswers } from '@/gameLogic/positions';
import {
    countMatchingNumbers,
    countMatchingStrings,
} from '@/gameLogic/results';
import { ResultButton } from './ResultButton';
import { setDifficultyLevel } from '@/store/slicer/AppSlice';

export const ResultButtonWrapper: React.FC = () => {
    const dispatch = useDispatch();

    const correctPositionsArray =
        useStore<RootState>().getState().gameSlice.correctPositionsArray;
    const correctLettersArray =
        useStore<RootState>().getState().gameSlice.correctLettersArray;
    const userPositionsAnswers =
        useStore<RootState>().getState().gameSlice.userPositionsAnswers;
    const userLetterAnswers =
        useStore<RootState>().getState().gameSlice.userLetterAnswers;

    const lettersResult = countMatchingStrings(
        userLetterAnswers,
        correctLettersArray
    );
    const positionResult = countMatchingNumbers(
        userPositionsAnswers,
        correctPositionsArray
    );
    const userResult = lettersResult + positionResult;
    const totalCorrectAnswersCount =
        countCorrectLetterAnswers(correctLettersArray) +
        countCorrectPositionAnswers(correctPositionsArray);

    console.log('result button', userResult, totalCorrectAnswersCount);
    // useEffect(() => {
    //     console.log('ile razy');
    //     if (userResult === 0 || userResult === 1) {
    //         console.log('minus');
    //         dispatch(setDifficultyLevel(-1));
    //     } else if (
    //         userResult === totalCorrectAnswersCount - 1 ||
    //         userResult === totalCorrectAnswersCount
    //     ) {
    //         console.log('plus');
    //         dispatch(setDifficultyLevel(1));
    //     }
    // });

    useEffect(() => {
        console.log('co do huja pana sie tu dzieje');
    });

    return (
        <ResultButton
            userResult={userResult}
            totalCorrectAnswersCount={totalCorrectAnswersCount}
        />
    );
};
