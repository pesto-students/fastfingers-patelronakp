import React, { useState, useEffect } from 'react'
import { getTotalTimeFromSeconds } from '../Utilities/constants';
export default function LiveScore() {
    const [score, setScore] = useState(0);

    useEffect(() => {
        const intervalID = setInterval(() =>
            setScore(score + 1)
            , 1000);
        return () => clearInterval(intervalID);
    });

    return (
        <div>
            <p className="commonText">Fast Fingers</p>
            <p className="commonText">SCORE : {getTotalTimeFromSeconds(score)}</p>
        </div>
    )

}