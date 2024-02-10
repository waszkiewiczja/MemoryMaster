import { useSelector } from 'react-redux';
import { GameStatus } from '@/types/game';
import { RootState } from '@/store';
import { StartButton } from './start/StartButton';
import { PositionButton } from './position/PositionButton';
import { LetterButton } from './letter/LetterButton';
import { ResultButtonWrapper } from './result/ResultButtonWrapper';
import { SettingsButton } from './settings/SettingsButton';

type ButtonsPropsType = { displayModal: (status: boolean) => void };

export const Buttons: React.FC<ButtonsPropsType> = ({ displayModal }) => {
    const gameStatus = useSelector(
        (state: RootState) => state.appSlice.gameStatus
    );

    return (
        <section className="w-full grid max-w-72   ">
            {gameStatus === GameStatus.TO_START ||
            gameStatus === GameStatus.FINISHED ? (
                <StartButton />
            ) : null}
            {gameStatus === GameStatus.TO_START ? (
                <SettingsButton displayModal={displayModal} />
            ) : null}

            {gameStatus === GameStatus.ACTIVE ? <PositionButton /> : null}
            {gameStatus === GameStatus.ACTIVE ? <LetterButton /> : null}

            {gameStatus === GameStatus.FINISHED ? (
                <ResultButtonWrapper />
            ) : null}
        </section>
    );
};
