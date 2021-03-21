
import React, { useState, useEffect } from 'react'
import UserInfo from '../../Component/UserInfo';
import { getTotalTimeFromSeconds, KEYS } from '../../Utilities/constants';
import storageHelper from '../../Utilities/storageHelper';
import { IoReload } from 'react-icons/io5';
import './ResultScreen.css'
export default function ResultScreen({ changePage }) {
    const [userName, setUserName] = useState("");
    const [gameMode, setGameMode] = useState("");
    const [score, setScore] = useState({});


    useEffect(() => {
        let { gameMode, userName, scoreList } = JSON.parse(storageHelper.fetch(KEYS.UserInfo));
        setGameMode(gameMode);
        setUserName(userName);
        let lastScore = scoreList.length > 0 ? scoreList[scoreList.length - 1] : {
            title: ``,
            score: 0,
            isHighest: false
        };
        setScore(lastScore);
        console.log(`useEffect GameScree :: ${gameMode} + ${userName}`);
    }, []);

    const onQuitOfGame = () => {
        storageHelper.resetAll();
        changePage(0);
    }


    return (
        <div className="container">
            <div className="header">
                <UserInfo userName={userName} gameMode={gameMode} />
            </div>
            <div className="gameArea">
                <div >
                    <div className="scoreTitle">SCORE : {score.title}</div>
                    <div className="score">{getTotalTimeFromSeconds(score.score)}</div>
                    {
                        score.isHighest === true && <div className="highScore">New High Score</div>
                    }
                    <button type="submit" className="btn" onClick={() => changePage(1)} ><IoReload size="55px" />Play Again</button>
                </div>
            </div>
            <div className="footer">
                <button type="submit" className="btn" onClick={onQuitOfGame} >QUIT</button>
            </div>
        </div >
    );
}