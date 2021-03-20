
import React from 'react'

export default function WordCheck({ wordToDisplay, wordTocheck, onWordMatch }) {

    const DisplayWord = () => {
        const lengthOfWordToCheck = wordTocheck.length;
        const wordtoDisplaylength = wordToDisplay.length;
        let matchString = "", unmatchedWord = "", remainingWord = wordToDisplay;
        let matchStringLen = 0;
        if (lengthOfWordToCheck !== 0) {
            if (wordToDisplay.substring(0, lengthOfWordToCheck) === wordTocheck.substring(0, lengthOfWordToCheck)) {
                matchString = wordTocheck;
                matchStringLen = lengthOfWordToCheck;
            }
            else {
                for (let startIndex = 1; startIndex <= lengthOfWordToCheck; startIndex++) {
                    if (wordTocheck.substring(0, startIndex) === wordToDisplay.substring(0, startIndex)) {
                        matchString = wordTocheck.substring(0, startIndex);
                    } else {
                        break;
                    }
                }
                matchStringLen = matchString.length;
                unmatchedWord = wordToDisplay.substring(matchStringLen, lengthOfWordToCheck);
            }
            remainingWord = wordToDisplay.substring(matchStringLen + unmatchedWord.length, wordtoDisplaylength);
            if (wordtoDisplaylength === matchStringLen) {
                setTimeout(() => {
                    onWordMatch();
                }, 20)

            }
        }

        return (<h1 className="displayWord">
            <span className="match">{matchString}</span>
            <span className="unmatch">{unmatchedWord}</span>
            {remainingWord}
        </h1>);
    }

    return (<DisplayWord />);
}