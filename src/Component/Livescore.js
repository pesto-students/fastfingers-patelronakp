import React from 'react'
import { getTotalTimeFromSeconds } from '../Utilities/constants';
export default function LiveScore({ displayScore }) {
    return (
        <div>
            <p className="commonText">Fast Fingers</p>
            <p className="commonText">SCORE : {getTotalTimeFromSeconds(displayScore)}</p>
        </div>
    )

}