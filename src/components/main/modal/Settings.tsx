import { setDifficultyLevel } from '@/store/slicer/AppSlice';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

export const Settings: React.FC = () => {
    const dispatch = useDispatch();

    const [numberValue, setNumberValue] = useState<number>(2);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        const parsedValue = parseInt(value, 10);
        if (!isNaN(parsedValue) && parsedValue >= 2 && parsedValue <= 8) {
            setNumberValue(parsedValue);
            dispatch(setDifficultyLevel(parsedValue));
        }
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
                    value={numberValue}
                    onChange={handleInputChange}
                    min={2}
                    max={8}
                    className="bg-gray-600 text-gray-100 pl-2 "
                />
            </div>
        </>
    );
};
