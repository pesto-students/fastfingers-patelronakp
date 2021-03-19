import React, { useState, useEffect } from 'react'
import { KEYS } from '../../Utilities/constants'
import storageHelper from '../../Utilities/storageHelper'
import './GameScreen.css'
import { FaUser, FaGamepad, Fa } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import GamePlay from '../../Component/GamePlay'
import LiveScore from '../../Component/Livescore';

export default function GameScreen() {
    let userInfo = JSON.parse(storageHelper.fetch(KEYS.UserInfo));
    const [userName, setUserName] = useState(userInfo.userName);
    const [gameMode, setGameMode] = useState(userInfo.gameMode);
    const [score, setScore] = useState("00:00");

    // useEffect(() => {
    //     let { gameMode, userName } = JSON.parse(storageHelper.fetch(KEYS.UserInfo));
    //     setGameMode(gameMode);
    //     setUserName(userName);
    // }, []);


    const onFinishGame = () => {
        return "";
    }

    return (
        <div className="container">
            <div className="header">
                <div>
                    <p className="commonText"><FaUser size="30px" /> {userName}</p>
                    <p className="commonText"><FaGamepad size="30px" /> {gameMode}</p>
                </div>
                <LiveScore />
            </div>
            <div className="content">
                <div className="scoreBoard">
                    <div className="title">
                        <h3>Score Board</h3>
                    </div>
                    <div className="alignLeftCenter">
                        <ul>
                            <li>Game 1 : 1:14</li>
                            <li>Game 1 : 1:14</li>
                            <li>Game 1 : 1:14</li>
                            <li>Game 1 : 1:14</li>
                        </ul>
                    </div>
                </div>
                <div className="gameArea">
                    <GamePlay onFinishGame={onFinishGame} difficultyLevel={gameMode} />
                </div>
            </div>
            <div className="footer">
                <button type="submit" className="btn"><IoClose size="55px" />STOP GAME</button>
            </div>
        </div>
    )

}