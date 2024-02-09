'use client';
import { Board } from './board/Board';
import { Buttons } from './buttons/Buttons';

export const Main: React.FC = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-around p-20">
            <Board />
            <Buttons />
        </main>
    );
};
