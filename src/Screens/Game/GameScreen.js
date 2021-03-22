import React, { useState, useEffect, useRef } from 'react'
import { KEYS, getTotalTimeFromSeconds } from '../../Utilities/constants'
import storageHelper from '../../Utilities/storageHelper'
import './GameScreen.css'
import { IoClose } from 'react-icons/io5';
import { GiPodiumWinner } from "react-icons/gi";
import GamePlay from '../../Component/GamePlay'
import LiveScore from '../../Component/Livescore';
import UserInfo from '../../Component/UserInfo';
import DataDictionary from '../../assets/dictionary.json';
import PropTypes from 'prop-types';

export default function GameScreen({ changePage }) {
    let userInfo = JSON.parse(storageHelper.fetch(KEYS.UserInfo));
    const [userName] = useState(userInfo.userName);
    const [gameMode, setGameMode] = useState(userInfo.gameMode);
    const [scoreList] = useState(userInfo.scoreList);
    const [score, setScore] = useState(0);
    const scoreTimerRef = useRef(null)

    useEffect(() => {
        scoreTimerRef.current = setInterval(() =>
            setScore(score + 1)
            , 1000);
        return () => clearInterval(scoreTimerRef.current);
    }, [score]);

    const onFinishGame = () => {
        clearInterval(scoreTimerRef.current);
        let numberOfGames = scoreList.length;
        let scoreListArr = scoreList;
        let hightestScoreIndex = scoreList.findIndex((score) => score.isHighest === true);
        let isHighest = true;
        if (hightestScoreIndex !== -1) {
            let hightestScore = scoreList[hightestScoreIndex];
            isHighest = hightestScore.score <= score ? true : false;
            if (isHighest) {
                scoreList[hightestScoreIndex].isHighest = false;
            }
        }
        scoreListArr.push({
            title: `Game ${numberOfGames + 1}`,
            score,
            isHighest
        });

        storageHelper.save(KEYS.UserInfo, JSON.stringify({ userName: userName.toUpperCase(), gameMode, scoreList: scoreListArr }));
        changePage(2);
    }

    const updateGameMode = (newGameMode) => {
        console.log("newGameMode ::" + newGameMode);
        setGameMode(newGameMode);
    }

    const scoreBoard = scoreList.map((userScore, index) => (<li key={index}>
        <div>
            {userScore.isHighest === true && <p>Personal Best </p>}
            {`${userScore.title} :: ${getTotalTimeFromSeconds(userScore.score)} `}
            {userScore.isHighest === true && <GiPodiumWinner size="30px" />}
        </div>
    </li>));

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
                        </ul>
                    </div>
                </div>
                <div className="gameArea">
                    <GamePlay onFinishGame={onFinishGame} difficultyLevel={gameMode} data={DataDictionary} onUpdateGameMode={updateGameMode} />
                </div>
            </div>
            <div className="footer">
                <button type="submit" className="btn"><IoClose size="55px" onClick={onFinishGame} />STOP GAME</button>
            </div>
        </div>
    )

}


GameScreen.propTypes = {
    changePage: PropTypes.func,
}


GameScreen.defaultProps = {
    changePage: () => { }
};
