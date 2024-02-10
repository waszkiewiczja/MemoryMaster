const paragraph = 'mb-10 text-gray-100';

export const GameRules: React.FC = () => {
    return (
        <>
            <h2 className="text-4xl font-bold text-gray-100 my-10 text-center ">
                Game rules
            </h2>
            <p className={paragraph}>
                Remember the letter that appears and the field in which it
                appears. The letter and the field are unrelated and independent.
            </p>
            <p className={paragraph}>
                If the same letter appears on the same or any other field two
                turns later, click the &quot;Letter&quot; button. If the same or
                a different letter appears in the same field two turns later,
                click the &quot;Position&quot; button. If both the letter and
                the position match, click both buttons.
            </p>
            <p className={paragraph}>
                If the letter does not match the letter from two turns ago, you
                do not click anything. If the field does not match the field
                from two turns, you do not click anything.
            </p>
            <p className={paragraph}>
                By default, the difficulty level is 2, which means you have to
                point to the letter and the square that appeared two turns ago.
                You will automatically advance to a higher level when you give
                90% correct answers. You will automatically drop down a level if
                you don&apos;t give any correct answer.
            </p>
            <p className={paragraph}>
                You can manually change the difficulty level in the settings.
                Difficulty Level 3 means you have to remember the letter and
                space that appeared three turns ago.
            </p>
        </>
    );
};
