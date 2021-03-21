import React, { useState, useEffect } from 'react'
import { getTotalTimeFromMiliSeconds } from '../../Utilities/constants';
import './CountDownSpinner.css'

export default function CountDownSpinner({ timer, wordToDisplay, onTimeOut }) {
    // const circleRef = useRef(null);

    const [remainingTime, setRemainingTime] = useState((timer * 1000));
    // const center = 60;
    // const normalizedRadius = center - 4 * 2;
    // const circumference = normalizedRadius * 2 * Math.PI;
    // const offset = 10;


    useEffect(() => {
        let miliseconds = timer * 1000;
        setRemainingTime(miliseconds);
    }, [wordToDisplay, timer]);

    useEffect(() => {
        let intervalID;
        if (timer === 0) return;
        intervalID = setInterval(() => {
            let leftTime = remainingTime - 10;
            if (leftTime <= 0) {
                clearInterval(intervalID);
                leftTime = 0;
                debugger;
                onTimeOut();
            } else
                setRemainingTime(leftTime);

        }, 10);
        return () => clearInterval(intervalID);
    }, [remainingTime])

    return (
        <div>
            {/* <svg className="svg">
                <circle className="svg-bg-circle" cx={center} cy={center} r={normalizedRadius} />
                <circle
                    className="svg-main-circle"
                    // ref={circleRef}
                    cx={center}
                    cy={center}
                    r={normalizedRadius}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset ? offset : 0}
                />
            </svg> */}
            <h1>{getTotalTimeFromMiliSeconds(remainingTime)}</h1>
        </div>
    )
}