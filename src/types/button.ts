import { GameStatus } from './game';

export enum ButtonName {
  START = 'Start',
  RESULT = 'Result',
  POSITION = 'Position',
  LETTER = 'Letter',
  COLOR = 'Color',
}

export type ButtonData = {
  name: ButtonName;
  display: GameStatus;
  onClick?: () => void;
};
