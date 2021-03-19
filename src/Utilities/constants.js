import appLogo from "../assets/appLogo.png"


export const APP_LOGO = appLogo;
export const KEYS = {
    UserInfo: "_userInfo"
}

export const GameModeParams = {
    Easy: { difficultyFactor: 1, allowedWord: (word) => word.length <= 4 },
    Medium: { difficultyFactor: 1.5, allowedWord: (word) => word.length >= 5 && word.length <= 8 },
    Hard: { difficultyFactor: 2, allowedWord: (word) => word.length > 8 }
};


export const getTotalTimeFromSeconds = (totalSeconds) => {
    function prefix(number) {
        return (number < 10 ? "0" : "") + number;
    }
    const seconds = parseInt(totalSeconds % 60);
    const minutes = parseInt((totalSeconds - seconds) / 60);
    return `${prefix(minutes)}:${prefix(seconds)}`;
}