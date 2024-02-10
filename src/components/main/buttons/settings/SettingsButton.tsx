import { ButtonName } from '@/types/button';

const buttonClass =
    'bg-[#393D41] text-[#D9DFE4] caret-transparent border border-solid border-orange-200 p-4 m-4 active:bg-yellow-900';

type SettingsButtonPropsType = { displayModal: (status: boolean) => void };

export const SettingsButton: React.FC<SettingsButtonPropsType> = ({
    displayModal,
}) => {
    return (
        <button className={buttonClass} onClick={() => displayModal(true)}>
            {ButtonName.SETTINGS}
        </button>
    );
};
