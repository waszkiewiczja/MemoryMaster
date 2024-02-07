import { Board } from './board/Board';
import { Buttons } from './buttons/Buttons';

export const Main: React.FC = () => {
  return (
    <>
      <p>MemoryMaster - Brain Training</p>
      <Board />
      <Buttons />
    </>
  );
};
