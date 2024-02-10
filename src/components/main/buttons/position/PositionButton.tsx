import { memo, useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { ButtonName } from '@/types/button';
import { RootState } from '@/store';
import { addToUserPositionsAnswers } from '@/store/slicer/GameSlice';

const buttonClass =
    'bg-[#393D41] text-[#D9DFE4] caret-transparent border border-solid border-orange-200 p-4 m-4 active:bg-yellow-900';

const PositionButtonComponent: React.FC = () => {
    const dispatch = useDispatch();

    const currentRound = useSelector(
        (state: RootState) => state.gameSlice.currentRound
    );

    const activePosition =
        useStore<RootState>().getState().gameSlice.activePosition;
    const userPositionsAnswers =
        useStore<RootState>().getState().gameSlice.userPositionsAnswers;

    let clicked = false;
    const onClickHandler = (): void => {
        if (activePosition >= 0)
            if (!clicked) {
                clicked = true;
                dispatch(addToUserPositionsAnswers(activePosition));
            }
    };

    useEffect(() => {
        if (userPositionsAnswers.length < currentRound)
            dispatch(addToUserPositionsAnswers(undefined));
    });

    return (
        <button className={buttonClass} onClick={onClickHandler}>
            {ButtonName.POSITION}
        </button>
    );
};

export const PositionButton = memo(PositionButtonComponent);
