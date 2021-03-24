import React, { useEffect, useState } from 'react'
import { FaUser, FaGamepad, } from 'react-icons/fa';
import { GameModeParams } from '../Utilities/constants';
import PropTypes from 'prop-types';
export default function UserInfo({ userName, gameMode }) {
    const [animate, setAnimate] = useState('');

    useEffect(() => {
        if (gameMode) {
            setAnimate("pulseEffect");
            setInterval(() => {
                setAnimate("");
            }, 1000);
        }
    }, [gameMode])

    return (
        <div>
            <p className="commonText"><FaUser size="30px" /> {userName}</p>
            <p className={`commonText ${animate}`}><FaGamepad size="30px" /> Level : {gameMode !== "" && GameModeParams[gameMode].mode}</p>
        </div>
    );
}


UserInfo.propTypes = {
    userName: PropTypes.string,
    gameMode: PropTypes.number,
}


UserInfo.defaultProps = {
    userName: "",
    gameMode: 0,
};
