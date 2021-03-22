import appLogo from "../assets/appLogo.png"


export const APP_LOGO = appLogo;
export const KEYS = {
    UserInfo: "_userInfo"
}

export const GameModeParams = [
    { difficultyFactor: 1, mode: "Easy", allowedWord: (word) => word.length <= 4 },
    { difficultyFactor: 1.5, mode: "Medium", allowedWord: (word) => word.length >= 5 && word.length <= 8 },
    { difficultyFactor: 2, mode: "Hard", allowedWord: (word) => word.length > 8 },
];


export const getTotalTimeFromSeconds = (totalSeconds) => {
    function prefix(number) {
        return (number < 10 ? "0" : "") + number;
    }
    const seconds = parseInt(totalSeconds % 60);
    const minutes = parseInt((totalSeconds - seconds) / 60);
    return `${prefix(minutes)}:${prefix(seconds)}`;
}

export const getTotalTimeFromMiliSeconds = (totalSeconds) => {
    const seconds = (totalSeconds / 1000).toFixed(2);
    return `${seconds}`;
}


export const formatTimeLeft = (time) => {
    let seconds = Math.floor(time / 1000);
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    let milliseconds = Math.round((time % 1000) / 10);
    if (milliseconds < 10) {
        milliseconds = `0${milliseconds}`;
    }

    return `${seconds}:${milliseconds}`;
};

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 1000;
const ALERT_THRESHOLD = 500;


const COLOR_CODES = {
    info: {
        color: "green"
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
    }
};


export const setRemainingPathColor = (timeLeft) => {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
        return alert.color;
    } else if (timeLeft <= warning.threshold) {
        return warning.color;
    } else {
        return info.color;
    }
}


export const calculateTimeFraction = (leftTime, time_limit) => {
    const rawTimeFraction = leftTime / time_limit;
    return rawTimeFraction - (1 / time_limit) * (1 - rawTimeFraction);
}

export const updateCircleDasharray = (leftTime, time_limit) => {
    const newcircleDasharray = `${(
        calculateTimeFraction(leftTime, time_limit) * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    return newcircleDasharray;
}