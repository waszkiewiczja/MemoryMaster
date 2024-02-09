import { useSelector } from 'react-redux';
import { Square } from '../square/Square';
import { RootState } from '@/store';

const squareIds = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

export const Board: React.FC = () => {
    const activeSquare = String(
        useSelector((state: RootState) => state.gameSlice.activePosition)
    );
    const activeLetter = useSelector(
        (state: RootState) => state.gameSlice.activeLetter
    );
    return (
        <section className="flex max-w-72 flex-wrap justify-center">
            {squareIds.map((squareId) => {
                return (
                    <Square
                        key={squareId}
                        squareId={squareId}
                        text={squareId === activeSquare ? activeLetter : ''}
                    />
                );
            })}
        </section>
    );
};
