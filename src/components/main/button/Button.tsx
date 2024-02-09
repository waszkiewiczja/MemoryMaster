import { ButtonData } from '@/types/button';

type ButtonPropsType = {
  button: ButtonData;
};

const buttonClass =
  'bg-[#393D41] text-[#D9DFE4] caret-transparent border border-solid border-orange-200 p-4 m-4 active:bg-yellow-900';

export const Button: React.FC<ButtonPropsType> = ({ button }) => {
  return (
    <button className={buttonClass} onClick={button.onClick}>
      {button.name}
    </button>
  );
};
