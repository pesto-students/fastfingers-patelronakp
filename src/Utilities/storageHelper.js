
const storageHelper = {
    save: (uniqueKey, value) => {
        sessionStorage.setItem(uniqueKey, value);
    },
    fetch: (uniqueKey) => {
        return sessionStorage.getItem(uniqueKey);
    },
    resetAll: () => {
        sessionStorage.clear();
    },
    

}

export default storageHelper;