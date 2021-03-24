import React, { useState } from 'react'
import { APP_LOGO, KEYS } from '../../Utilities/constants'
import storageHelper from '../../Utilities/storageHelper'
import './WelcomeScreen.css'
import { FaPlay } from 'react-icons/fa';
import PropTypes from 'prop-types';



export default function WelcomeScreen({ changePage }) {
    const { userName = "", gameMode = 0, scoreList = [] } = storageHelper.fetch(KEYS.UserInfo);
    const [curUserName, setUserName] = useState(userName);
    const [curgameMode, setGameMode] = useState(gameMode);

    const onSubmitSignUpForm = (e) => {
        e.preventDefault();
        storageHelper.save(KEYS.UserInfo, JSON.stringify({ userName: curUserName.toUpperCase(), gameMode: curgameMode, scoreList: scoreList }));
        changePage(1);
    };

    return (
        <div className="centerBox ">
            <img src={APP_LOGO} alt="Fast Fingers Logo" className="logo" />

            <form onSubmit={onSubmitSignUpForm} className="popout">
                <h1>Fast Fingers</h1>
                <h2>------- the ultimate typing game -------</h2>
                <div>
                    <input type="text" placeholder="type your name" required onChange={(e) => setUserName(e.target.value)} value={curUserName} autoFocus ></input>
                </div>
                <div>
                    <select name="gameMode" id="gameMode" onChange={(e) => setGameMode(parseInt(e.target.value))} value={curgameMode}>
                        <option value="0">Easy</option>
                        <option value="1">Medium</option>
                        <option value="2">Hard</option>
                    </select>
                </div>
                <div className="bottomEntry">
                    <button type="submit" className="btn"><FaPlay size="42px" /> START GAME </button>
                </div>
            </form>
        </div>
    )
}


WelcomeScreen.propTypes = {
    changePage: PropTypes.func,
}


WelcomeScreen.defaultProps = {
    changePage: () => { }
};

