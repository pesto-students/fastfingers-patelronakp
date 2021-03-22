import React, { useState, useEffect, useRef } from 'react'
import { getTotalTimeFromMiliSeconds, setRemainingPathColor, updateCircleDasharray } from '../../Utilities/constants';
import './CountDownSpinner.css'
import PropTypes from 'prop-types';


export default function CountDownSpinner({ timer, wordToDisplay, onTimeOut }) {
    const [remainingTime, setRemainingTime] = useState(timer);
    const [remainingPathColor, setremainingPathColor] = useState("green")
    const [circleDasharray, setCircleDasharray] = useState(updateCircleDasharray(timer, timer));
    const countDownTimerRef = useRef(null)


    useEffect(() => {
        setRemainingTime(timer);
    }, [timer, wordToDisplay]);

    useEffect(() => {
        setCircleDasharray(updateCircleDasharray(remainingTime, timer));
        setremainingPathColor(setRemainingPathColor(remainingTime));
        if (remainingTime <= 0) {
            clearInterval(countDownTimerRef.current);
            onTimeOut();
        }
    }, [onTimeOut, remainingTime, timer])


    useEffect(() => {
        if (remainingTime <= 0) {
            clearInterval(countDownTimerRef.current);
        } else {
            countDownTimerRef.current = setInterval(() => {
                if (remainingTime > 0)
                    setRemainingTime(prevTime => prevTime - 5);
            }, 1);
        }
        return () => clearInterval(countDownTimerRef.current);
    }, [remainingTime]);


    return (
        <div>
            <div className="base-timer">
                <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <g className="base-timer__circle">
                        <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                        <path
                            id="base-timer-path-remaining"
                            strokeDasharray={circleDasharray}
                            className={`base-timer__path-remaining ${remainingPathColor}`}
                            d="
                                    M 50, 50
                                    m -45, 0
                                    a 45,45 0 1,0 90,0
                                    a 45,45 0 1,0 -90,0
                                    "
                        ></path>
                    </g>
                </svg>
                <span id="base-timer-label" className="base-timer__label">{getTotalTimeFromMiliSeconds(remainingTime)}</span>
            </div>
        </div>
    )
}


CountDownSpinner.propTypes = {
    timer: PropTypes.number,
    wordToDisplay: PropTypes.string,
    onTimeOut: PropTypes.func
};

CountDownSpinner.defaultProps = {
    timer: 0,
    wordToDisplay: "",
    onTimeOut: () => { },
};
