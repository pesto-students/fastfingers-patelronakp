import React, { useState, useEffect } from 'react'
import { GameModeParams } from "../Utilities/constants";
import CountDownSpinner from './CountDownSpinner/CountDownSpinner';
import WordCheck from './WordCheck';
import PropTypes from 'prop-types';

export default function GamePlay({ onFinishGame, difficultyLevel, data, onUpdateGameMode }) {

    const [words, setWords] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [activeWord, setActiveWord] = useState("");
    const [word, setWord] = useState("");
    const [remainingTime, setRemainingTime] = useState(0);
    const [difficultyFactor, setdifficultyFactor] = useState(GameModeParams[difficultyLevel].difficultyFactor);

    useEffect(() => {
        setWordsBasedOnDifficultyLevel();
        return () => { };
    }, []);

    const setWordsBasedOnDifficultyLevel = () => {
        let gameModeParam = GameModeParams[difficultyLevel];
        let filterwords = data.filter(word => gameModeParam.allowedWord(word));
        setWords(filterwords);
        const randomNumber = Math.floor(
            Math.random() * filterwords.length
        );
        let newWord = filterwords[randomNumber].toUpperCase();
        setActiveWord(newWord);
        let timer = Math.ceil(newWord.length / gameModeParam.difficultyFactor);
        setRemainingTime(timer);
        //setdifficultyFactor(gameModeParam.difficultyFactor);
        console.log("Timer Generated ::" + timer);
    }


    const generateNextWord = () => {
        const randomNumber = Math.floor(
            Math.random() * words.length
        );
        let newWord = words[randomNumber].toUpperCase();
        setActiveWord(newWord);
        setWord("");
        let updateddifficultyFactor = difficultyFactor + 0.05;
        let timer = Math.ceil(newWord.length / updateddifficultyFactor);

        setdifficultyFactor(updateddifficultyFactor);
        setRemainingTime(timer > 2 ? timer : 2);
        console.log("Difficulty Level ::" + updateddifficultyFactor);
    }

    useEffect(() => {
        if (difficultyLevel !== 2) {
            let newLevel = difficultyLevel + 1;
            if (difficultyFactor >= GameModeParams[newLevel].difficultyFactor) {
                let gameModeParam = GameModeParams[newLevel];
                let filterwords = data.filter(word => gameModeParam.allowedWord(word));
                setWords(filterwords);
                onUpdateGameMode(newLevel);
            }
        }
    }, [difficultyFactor]);


    const onChangeOfInput = (e) => {
        const { target: { value } = {} } = e;
        //console.log(value);
        setWord(value.toUpperCase());
    };


    return (
        <>
            {remainingTime !== 0 &&
                <CountDownSpinner timer={remainingTime * 1000} wordToDisplay={activeWord} onTimeOut={onFinishGame} />}
            <WordCheck wordToDisplay={activeWord} wordTocheck={word} onWordMatch={generateNextWord} />
            <div>
                <input type="text" name="userWord" onChange={onChangeOfInput} value={word} autoComplete="off" autoFocus ></input>
            </div>
        </>
    )
}

GamePlay.propTypes = {
    difficultyLevel: PropTypes.number,
    data: PropTypes.array,
    onFinishGame: PropTypes.func,
    onUpdateGameMode: PropTypes.func
}


GamePlay.defaultProps = {
    difficultyLevel: 0,
    data: [],
    onFinishGame: () => { },
    onTimeOut: () => { },
};
