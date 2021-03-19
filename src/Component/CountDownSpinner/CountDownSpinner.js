import React, { useState, useEffect } from 'react'
import './CountDownSpinner.css'

export default function CountDownSpinner({ timer }) {
    // const circleRef = useRef(null);
    let miliseconds = timer * 1000;
    
    const center = 60;
    const normalizedRadius = center - 4 * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const offset = 10;

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
            <h1>{timer}</h1>
        </div>
    )
}