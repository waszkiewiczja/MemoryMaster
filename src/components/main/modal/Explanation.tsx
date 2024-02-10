export const Explanation: React.FC = () => {
    const paragraph = 'mb-10 text-gray-100';

    return (
        <>
            <h2 className="text-4xl font-bold text-gray-100 my-10 text-center ">
                Detailed explanation
            </h2>
            <p className={paragraph}> Difficulty level 2 (default). </p>
            <p className={paragraph}>
                On turn 1, a random letter will appear on a random field.
                Remember the letter and position.
            </p>
            <p className={paragraph}>
                On turn 2, a random letter will appear on a random field.
                Remember the letter and position.
            </p>
            <p className={paragraph}>
                On turn 3, a random letter will appear on a random field.
                Remember the letter and position. If the letter from this turn
                corresponds to the letter from turn 1, click the
                &quot;Letter&quot; button. If the position from this turn
                corresponds to the position from turn 1, click the
                &quot;Position&quot; button.
            </p>
            <p className={paragraph}>
                On turn 4, a random letter will appear on a random field.
                Remember the letter and position. If the letter from this turn
                corresponds to the letter from turn 2, click the
                &quot;Letter&quot; button. If the position from this round
                corresponds to the position from round 2, click the
                &quot;Position&quot; button.
            </p>
            <p className={paragraph}>
                On turn 5, a random letter will appear on a random field.
                Remember the letter and position. If the letter from this turn
                corresponds to the letter from turn 3, click the
                &quot;Letter&quot; button. If the position from this turn
                corresponds to the position from turn 3, click the
                &quot;Position&quot; button.
            </p>
        </>
    );
};
