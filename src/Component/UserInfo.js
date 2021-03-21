import React from 'react'
import { FaUser, FaGamepad, } from 'react-icons/fa';
export default function UserInfo({ userName, gameMode }) {
    console.log("UserInfo" + userName);
    return (
        <div>
            <p className="commonText"><FaUser size="30px" /> {userName}</p>
            <p className="commonText"><FaGamepad size="30px" /> {gameMode}</p>
        </div>
    );
}