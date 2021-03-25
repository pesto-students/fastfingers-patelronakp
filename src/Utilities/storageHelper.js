
const storageHelper = {
    save: (uniqueKey, value) => {
        sessionStorage.setItem(uniqueKey, value);
    },
    fetch: (uniqueKey) => {
        let userObject = sessionStorage.getItem(uniqueKey);
        return userObject ? JSON.parse(userObject) : { userName: '', gameMode: 0 };
    },
    resetAll: () => {
        sessionStorage.clear();
    },


}

export default storageHelper;