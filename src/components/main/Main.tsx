'use client';
import { Board } from './board/Board';
import { Buttons } from './buttons/Buttons';
import { Title } from './title/Title';

export const Main: React.FC = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-around p-10">
            <Title />
            <Board />
            <Buttons />
        </main>
    );
};
