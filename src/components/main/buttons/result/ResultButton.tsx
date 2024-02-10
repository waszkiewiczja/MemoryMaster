import { useState } from 'react';
import { ButtonName } from '@/types/button';

const buttonClass =
    'bg-[#393D41] text-[#D9DFE4] caret-transparent border border-solid border-orange-200 p-4 m-4 active:bg-yellow-900';

type ResultButtonPropsType = {
    userResult: number;
    totalCorrectAnswersCount: number;
};

export const ResultButton: React.FC<ResultButtonPropsType> = ({
    userResult,
    totalCorrectAnswersCount,
}) => {
    const [show, setShow] = useState(true);

    const onClickHandler = (): void => {
        setShow((prevState) => !prevState);
    };

    const result = show ? (
        <>
            {userResult} / {totalCorrectAnswersCount}
        </>
    ) : (
        <>{((100 * userResult) / totalCorrectAnswersCount).toFixed(1)} %</>
    );

    return (
        <button className={buttonClass} onClick={onClickHandler}>
            {ButtonName.RESULT}: {result}
        </button>
    );
};
