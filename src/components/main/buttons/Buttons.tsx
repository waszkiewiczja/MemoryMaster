import { useSelector } from 'react-redux';
import { GameStatus } from '@/types/game';
import { RootState } from '@/store';
import { StartButton } from './start/StartButton';
import { PositionButton } from './position/PositionButton';
import { LetterButton } from './letter/LetterButton';
import { ResultButtonWrapper } from './result/ResultButtonWrapper';

export const Buttons: React.FC = () => {
    const gameStatus = useSelector(
        (state: RootState) => state.appSlice.gameStatus
    );

    return (
        <section className="flex text-center ">
            {gameStatus === GameStatus.TO_START ||
            gameStatus === GameStatus.FINISHED ? (
                <StartButton />
            ) : null}

            {gameStatus === GameStatus.ACTIVE ? <PositionButton /> : null}
            {gameStatus === GameStatus.ACTIVE ? <LetterButton /> : null}

            {gameStatus === GameStatus.FINISHED ? (
                <ResultButtonWrapper />
            ) : null}
        </section>
    );
};
