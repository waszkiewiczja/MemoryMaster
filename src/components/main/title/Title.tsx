type TitlePropsType = {
    displayModal: (status: boolean) => void;
};
export const Title: React.FC<TitlePropsType> = ({ displayModal }) => {
    return (
        <button
            className="text-4xl font-bold text-gray-500 cursor-pointer"
            onClick={() => displayModal(true)}
        >
            Memory Master
        </button>
    );
};
