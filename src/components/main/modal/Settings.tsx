import { RootState } from '@/store';
import { setDifficultyLevel } from '@/store/slicer/AppSlice';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Settings: React.FC = () => {
    const dispatch = useDispatch();

    const difficultyLevel = String(
        useSelector((state: RootState) => state.appSlice.difficultyLevel)
    );

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        dispatch(setDifficultyLevel(Number(value)));
    };
    return (
        <>
            <h2 className="text-4xl font-bold text-gray-100 my-10 text-center ">
                Settings
            </h2>
            <div>
                <label className="text-gray-100 mr-4" htmlFor="numberInput">
                    Set difficulty level:
                </label>
                <input
                    type="number"
                    id="numberInput"
                    value={difficultyLevel}
                    onChange={handleInputChange}
                    min={2}
                    max={8}
                    className="bg-gray-600 text-gray-100 pl-2 "
                />
            </div>
        </>
    );
};
