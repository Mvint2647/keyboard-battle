const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;
const randomWords = require('random-words');

module.exports = {
    createQueryID: (len = 5) => {
        let result = '';
        for ( var i = 0; i < len; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    getRandomWord: (length) => {
        return randomWords()
    },
    toNormalCase: (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
}