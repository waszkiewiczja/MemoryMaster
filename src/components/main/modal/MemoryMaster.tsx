const paragraph = 'mb-10 text-gray-100';

export const MemoryMaster: React.FC = () => {
    return (
        <>
            <h1 className="text-4xl font-bold text-gray-100 mb-10 text-center ">
                Memory Master <br></br> Brain Training Game
            </h1>
            <p className={paragraph}>
                Brain training is based on the idea that mental stimulation can
                improve neuroplasticity. It is the ability of the brain to
                create and reorganize connections between brain cells in
                response to new stimuli and tasks. The Brain Training Game
                Boosts Executive Functions study published in PLOS One in 2013
                found that people who engaged in brain training games showed
                improvements in information processing speed, memory and
                executive functions.
            </p>
            <p className={paragraph}>
                Memory Master is a game that intensively simulates short-term
                memory, improving focus and concentration.
            </p>
            <p className={paragraph}>
                It involves remembering the letters and positions that appear on
                the board and, in the extended version, also the colors of the
                letters. As the difficulty increases, we have to remember more
                and more information.
            </p>
            <p className={paragraph}>
                The game requires us to simultaneously remember information and
                use information already memorized, strongly stimulating the
                brain.
            </p>
        </>
    );
};
