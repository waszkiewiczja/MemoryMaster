'use client';
import { useState } from 'react';
import { Board } from './board/Board';
import { Buttons } from './buttons/Buttons';
import { Modal } from './modal/Modal';
import { Title } from './title/Title';

export const Main: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const displayModal = (status: boolean): void => {
        setIsVisible(status);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-around p-10">
            <Title displayModal={displayModal} />
            <Board />
            <Buttons displayModal={displayModal} />
            <Modal isVisible={isVisible} displayModal={displayModal} />
        </main>
    );
};
