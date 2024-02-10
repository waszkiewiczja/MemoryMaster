import { setActivePosition } from '@/store/slicer/GameSlice';
import { useDispatch } from 'react-redux';

const square =
    'bg-[#2f2f2f] w-20 h-20 m-0 text-slate-200 flex items-center justify-center text-2xl ';

type SquarePropsType = {
    squareId: string;
    text: string;
};

export const Square: React.FC<SquarePropsType> = ({ squareId, text }) => {
    const dispatch = useDispatch();
    if (text) {
        setTimeout(function () {
            dispatch(setActivePosition(-1));
        }, 1000);
    }
    return (
        <div className={square} id={squareId}>
            <span className="inline-block align-baseline">{text}</span>
        </div>
    );
};
