import { Explanation } from './Explanation';
import { GameRules } from './GameRules';
import { MemoryMaster } from './MemoryMaster';
import { Settings } from './Settings';

type ModalPropsType = {
    isVisible: boolean;
    displayModal: (status: boolean) => void;
};

const paragraph = 'mb-10 text-gray-100';

export const Modal: React.FC<ModalPropsType> = ({
    isVisible,
    displayModal,
}) => {
    return (
        <div
            className={`bg-[#181818] fixed top-0 left-0 w-full h-screen flex justify-center items-center  opacity-100 transition-opacity duration-500 ${
                isVisible ? 'visible' : 'invisible'
            }`}
        >
            <div className="relative bg-[#212121] max-w-2xl max-h-[500px] flex justify-space-around items-center flex-col opacity-100 text-gray-300 p-12 text-justify overflow-y-auto border border-wheat caret-transparent ">
                <span
                    className="absolute top-4 right-4 font-bold cursor-pointer text-3xl"
                    onClick={() => displayModal(false)}
                >
                    X
                </span>

                <MemoryMaster />
                <GameRules />
                <Explanation />
                <Settings />
            </div>
        </div>
    );
};
