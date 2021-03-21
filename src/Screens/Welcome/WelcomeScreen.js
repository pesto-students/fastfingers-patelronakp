import React, { useState } from 'react'
import { APP_LOGO, KEYS } from '../../Utilities/constants'
import storageHelper from '../../Utilities/storageHelper'
import './WelcomeScreen.css'
import { FaPlay } from 'react-icons/fa';

export default function WelcomeScreen({ changePage }) {

    const [userName, setUserName] = useState("");
    const [gameMode, setGameMode] = useState("Easy");


    const onSubmitSignUpForm = (e) => {
        e.preventDefault();
        storageHelper.save(KEYS.UserInfo, JSON.stringify({ userName: userName.toUpperCase(), gameMode, scoreList: [] }));
        changePage(1);
    };

    return (
        <div className="centerBox">
            <img src={APP_LOGO} alt="Fast Fingers Logo" />
            <h1>Fast Fingers</h1>
            <h2>------- the ultimate typing game -------</h2>
            <form onSubmit={onSubmitSignUpForm}>
                <div>
                    <input type="text" placeholder="type your name" required onChange={(e) => setUserName(e.target.value)} value={userName} ></input>
                </div>
                <div>
                    <select name="gameMode" id="gameMode" onChange={(e) => setGameMode(e.target.value)} value={gameMode}>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                <div>
                    <button type="submit" className="btn"><FaPlay size="42px" /> Success</button>
                </div>
            </form>
        </div>
    )
}
