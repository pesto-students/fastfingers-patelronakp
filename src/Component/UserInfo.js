import React from 'react'
import { FaUser, FaGamepad, } from 'react-icons/fa';
import { GameModeParams } from '../Utilities/constants';
import PropTypes from 'prop-types';
export default function UserInfo({ userName, gameMode }) {
    console.log("UserInfo" + userName);

    return (
        <div>
            <p className="commonText"><FaUser size="30px" /> {userName}</p>
            <p className="commonText"><FaGamepad size="30px" /> {gameMode !== "" && GameModeParams[gameMode].mode}</p>
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
