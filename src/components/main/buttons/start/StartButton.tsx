import { useDispatch, useSelector } from 'react-redux';
import { ButtonName } from '@/types/button';
import { handleLetters } from '@/gameLogic/letters';
import { setActiveStatus, setFinishedStatus } from '@/store/slicer/AppSlice';
import { handlePositions } from '@/gameLogic/positions';
import {
    increaseCurrentRound,
    resetCurrentAnswers,
    resetCurrentRound,
    setActiveLetter,
    setActivePosition,
    setCorrectAnswersCount,
    setCorrectLettersArray,
    setCorrectPositionsArray,
    setLettersArray,
    setSquaresArray,
} from '@/store/slicer/GameSlice';
import { RootState } from '@/store';

const buttonClass =
    'bg-[#393D41] text-[#D9DFE4] caret-transparent border border-solid border-orange-200 p-4 m-4 active:bg-yellow-900';

export const StartButton: React.FC = () => {
    const dispatch = useDispatch();

    const difficultyLevel = useSelector(
        (state: RootState) => state.appSlice.difficultyLevel
    );
    const gameDuration = useSelector(
        (state: RootState) => state.appSlice.gameDuration
    );

    const displayResults = () => {
        setTimeout(function () {
            dispatch(setFinishedStatus());
            dispatch(resetCurrentRound());
        }, 2000);
    };

    const startDisplaying = ({
        squaresArray,
        lettersArray,
    }: {
        squaresArray: number[];
        lettersArray: string[];
    }) => {
        let currentRound = -1;
        let interval = setInterval(function () {
            currentRound++;
            const activeSquare = squaresArray[currentRound];
            const activeLetter = lettersArray[currentRound];
            dispatch(setActivePosition(activeSquare));
            dispatch(setActiveLetter(activeLetter));
            dispatch(increaseCurrentRound());
            console.log('wybuch stop');

            if (currentRound >= gameDuration - 1) {
                clearInterval(interval);
                displayResults();
            }
        }, 2000);
    };

    const onClickHandler = () => {
        console.log('wubich start', difficultyLevel, gameDuration);
        const { squaresArray, correctPositionsArray, correctPositionCount } =
            handlePositions({ difficultyLevel, gameDuration });
        const { lettersArray, correctLettersArray, correctLetterCount } =
            handleLetters({ difficultyLevel, gameDuration });
        dispatch(resetCurrentAnswers());
        dispatch(setSquaresArray(squaresArray));
        dispatch(setLettersArray(lettersArray));
        dispatch(setCorrectPositionsArray(correctPositionsArray));
        dispatch(setCorrectLettersArray(correctLettersArray));
        dispatch(
            setCorrectAnswersCount(correctPositionCount + correctLetterCount)
        );
        dispatch(setActiveStatus());
        startDisplaying({ squaresArray, lettersArray });
    };

    return (
        <button className={buttonClass} onClick={onClickHandler}>
            {ButtonName.START} lvl: {difficultyLevel}
        </button>
    );
};
