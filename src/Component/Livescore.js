import React from 'react'
import { getTotalTimeFromSeconds } from '../Utilities/constants';
import PropTypes from 'prop-types';


export default function LiveScore({ displayScore }) {
    return (
        <div>
            <p className="commonText gameTitle">Fast Fingers</p>
            <p className="commonText countDown">SCORE : {getTotalTimeFromSeconds(displayScore)}</p>
        </div>
    )
}


LiveScore.propTypes = {
    displayScore: PropTypes.number,
}


LiveScore.defaultProps = {
    displayScore: 0,

};
