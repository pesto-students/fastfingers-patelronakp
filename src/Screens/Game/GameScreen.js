import React, { useState, useEffect, useRef } from 'react'
import { KEYS, getTotalTimeFromSeconds } from '../../Utilities/constants'
import storageHelper from '../../Utilities/storageHelper'
import './GameScreen.css'

import { IoClose } from 'react-icons/io5';
import GamePlay from '../../Component/GamePlay'
import LiveScore from '../../Component/Livescore';
import UserInfo from '../../Component/UserInfo';

export default function GameScreen({ changePage }) {
    // let userInfo = JSON.parse(storageHelper.fetch(KEYS.UserInfo));
    // const [userName, setUserName] = useState(userInfo.userName);
    // const [gameMode, setGameMode] = useState(userInfo.gameMode);
    const [userName, setUserName] = useState("");
    const [gameMode, setGameMode] = useState("");
    const [scoreList, setScoreList] = useState([]);
    const [score, setScore] = useState(0);
    const scoreTimerRef = useRef(null)

    // const intervalID = setInterval(() =>
    //     setScore(score + 1)
    //     , 1000);

    useEffect(() => {
        console.log("score card call");
        scoreTimerRef.current = setInterval(() =>
            setScore(score + 1)
            , 1000);
        return () => clearInterval(scoreTimerRef.current);
    }, [score]);

    useEffect(() => {
        let { gameMode, userName, scoreList } = JSON.parse(storageHelper.fetch(KEYS.UserInfo));
        setGameMode(gameMode);
        setUserName(userName);
        setScoreList(scoreList);
        console.log(`useEffect GameScree :: ${gameMode} + ${userName}`);
    }, []);


    const onFinishGame = () => {
        console.log("onFinsishGame called");
        clearInterval(scoreTimerRef.current);
        let numberOfGames = scoreList.length;
        let scoreListArr = scoreList;
        scoreListArr.push({
            title: `Game ${numberOfGames + 1}`,
            score,
            isHighest: false
        })
        storageHelper.save(KEYS.UserInfo, JSON.stringify({ userName: userName.toUpperCase(), gameMode, scoreList: scoreListArr }));
        changePage(2);
    }


    const scoreBoard = scoreList.map(userScore => (<li>{`${userScore.title} :: ${getTotalTimeFromSeconds(userScore.score)} `}</li>));

    return (
        <div className="container">
            <div className="header">
                <UserInfo userName={userName} gameMode={gameMode} />
                <LiveScore displayScore={score} />
            </div>
            <div className="content">
                <div className="scoreBoard">
                    <div className="title">
                        <h3>Score Board</h3>
                    </div>
                    <div className="alignLeftCenter">
                        <ul>
                            {scoreBoard}
                            {/* <li>Game 1 : 1:14</li>
                            <li>Game 1 : 1:14</li>
                            <li>Game 1 : 1:14</li>
                            <li>Game 1 : 1:14</li> */}
                        </ul>
                    </div>
                </div>
                <div className="gameArea">
                    <GamePlay onFinishGame={onFinishGame} difficultyLevel={gameMode} />
                </div>
            </div>
            <div className="footer">
                <button type="submit" className="btn"><IoClose size="55px" onClick={onFinishGame} />STOP GAME</button>
            </div>
        </div>
    )

}