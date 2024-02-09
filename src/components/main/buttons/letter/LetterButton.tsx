import { memo, useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { ButtonName } from '@/types/button';
import { RootState } from '@/store';
import { addToUserLettersAnswers } from '@/store/slicer/GameSlice';

const buttonClass =
    'bg-[#393D41] text-[#D9DFE4] caret-transparent border border-solid border-orange-200 p-4 m-4 active:bg-yellow-900';

const LetterButtonComponent: React.FC = () => {
    const dispatch = useDispatch();

    const currentRound = useSelector(
        (state: RootState) => state.gameSlice.currentRound
    );

    const activeLetter =
        useStore<RootState>().getState().gameSlice.activeLetter;
    const userLetterAnswers =
        useStore<RootState>().getState().gameSlice.userLetterAnswers;

    let clicked = false;
    const onClickHandler = () => {
        if (activeLetter)
            if (!clicked) {
                clicked = true;
                dispatch(addToUserLettersAnswers(activeLetter));
            }
    };

    useEffect(() => {
        if (userLetterAnswers.length < currentRound) {
            dispatch(addToUserLettersAnswers(undefined));
        }
    });

    return (
        <button className={buttonClass} onClick={onClickHandler}>
            {ButtonName.LETTER}
        </button>
    );
};

export const LetterButton = memo(LetterButtonComponent);
