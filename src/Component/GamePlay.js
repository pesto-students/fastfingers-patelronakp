import React, { useState, useEffect } from 'react'
import { GameModeParams } from "../Utilities/constants";
import CountDownSpinner from './CountDownSpinner/CountDownSpinner';
import WordCheck from './WordCheck';

export default function GamePlay({ onFinishGame, difficultyLevel }) {



    const [words, setWords] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [activeWord, setActiveWord] = useState("");
    const [word, setWord] = useState("");
    const [remainingTime, setRemainingTime] = useState();
    const [difficultyFactor, setdifficultyFactor] = useState(0);



    useEffect(() => {
        fetch("/dictionary.json")
            .then((response) => response.json())
            .then((jsonResponse) => {
                console.log(difficultyLevel);
                let gameModeParam = GameModeParams[difficultyLevel]
                let filterwords = jsonResponse.filter(word => gameModeParam.allowedWord(word));
                setWords(filterwords);
                const randomNumber = Math.floor(
                    Math.random() * filterwords.length
                );
                let newWord = filterwords[randomNumber].toUpperCase();
                setActiveWord(newWord);
                let timer = Math.ceil(newWord.length / gameModeParam.difficultyFactor);
                setRemainingTime(timer);
                setdifficultyFactor(gameModeParam.difficultyFactor);
            })
            .catch((error) => {
                setErrorMessage(error.Message);
            });
        return () => { };
    }, [errorMessage]);

    const generateNextWord = () => {
        const randomNumber = Math.floor(
            Math.random() * words.length
        );
        let newWord = words[randomNumber].toUpperCase();
        setActiveWord(newWord);
        setWord("");
        let updateddifficultyFactor = difficultyFactor + 0.01;
        let timer = Math.ceil(newWord.length / updateddifficultyFactor);
        setdifficultyFactor(updateddifficultyFactor);
        setRemainingTime(timer > 2 ? timer : 2);
    }

    const onChangeOfInput = (e) => {
        const { target: { value } = {} } = e;
        //console.log(value);
        setWord(value.toUpperCase());
    };

    return (
        <div>
            <CountDownSpinner timer={remainingTime} />
            <WordCheck wordToDisplay={activeWord} wordTocheck={word} onWordMatch={generateNextWord} />
            <div>
                <input type="text" name="userWord" onChange={onChangeOfInput} value={word} ></input>
            </div>
        </div>
    )
}