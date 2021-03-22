
import React, { useState } from 'react'
import UserInfo from '../../Component/UserInfo';
import { getTotalTimeFromSeconds, KEYS } from '../../Utilities/constants';
import storageHelper from '../../Utilities/storageHelper';
import { IoReload } from 'react-icons/io5';
import './ResultScreen.css'
import PropTypes from 'prop-types';

const getTheLastScore = (scoreList) => {
    let lastScore = scoreList.length > 0 ? scoreList[scoreList.length - 1] : {
        title: ``,
        score: 0,
        isHighest: false
    };
    return lastScore;
}


export default function ResultScreen({ changePage }) {
    let userInfo = JSON.parse(storageHelper.fetch(KEYS.UserInfo));
    const [userName] = useState(userInfo.userName);
    const [gameMode] = useState(userInfo.gameMode);
    const [score] = useState(getTheLastScore(userInfo.scoreList));

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



ResultScreen.propTypes = {
    changePage: PropTypes.func,
}


ResultScreen.defaultProps = {
    changePage: () => { }
};
