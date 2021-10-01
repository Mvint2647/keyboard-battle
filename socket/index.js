const socket = require('socket.io');
const sharedsession = require("express-socket.io-session");
const { Match, Text } = require('../models');
const { getRandomWord, toNormalCase } = require('../utils');
var io;
//the game logic will be programmed here for now, may eventually be modularized
var matches = {} //matches will keep track of queryIDs and the socketids of each player 


const matchJoin = async (data, socket) => {
    currentSession = socket.handshake.session;
    //get the match they are requesting to join
    const requestedMatch = await Match.findOne({
        where: {
            queryID: data
        }
    });
    //start tracking the match if we aren't already
    if (!matches[requestedMatch.queryID]) {
        matches[requestedMatch.queryID] = {
            p1: {
                id: null, //player id, aligns with primary key of players table
                sid: null, //socket.id, the id of the socket theyre connecting with
                score: 0, //their score
                ready: false, //have they readied up?
                typed: "" //what have they typed?
            },
            p2: {
                id: null,
                sid: null,
                score: 0,
                ready: false,
                typed: ""
            },
            maxScore: 7, //how many points to win
            gameState: 'created',
            currentWord: null
        }
    }
    let currentMatch = matches[requestedMatch.queryID];
    //are they the player who created the match? if not, theyll join as player two if no one else has. otherwise, theyll spectate
    if (currentSession.playerID == requestedMatch.player1_id){
        currentMatch.p1.sid = socket.id;
        currentMatch.p1.id = currentSession.playerID;
        socket.join(requestedMatch.queryID);
        socket.emit('matchCreated', 0); //tell the client the match is ready and tell them which player they are so they can interperet the score later
        console.log("player 1 is here");
    } else if (!requestedMatch.player2_id || currentSession.playerID == requestedMatch.player2_id) {
        currentMatch.p2.sid = socket.id;
        currentMatch.p2.id = currentSession.playerID;
        socket.emit('matchCreated', 1);
        socket.join(requestedMatch.queryID);
        requestedMatch.player2_id = currentSession.playerID;
        await requestedMatch.save();
        console.log(`Player 2 has joined. Their id is ${currentSession.playerID}`);
    }
    if (currentMatch.p1.id && currentMatch.p2.id) {
        initializeMatch(requestedMatch.queryID, socket);
    }
}

const initializeMatch = (queryID, socket) => {
    if (matches[queryID]) {
        let currentMatch = matches[queryID];
        console.log('starting');
        currentMatch.gameState = 'Starting';
    }
}

const playerReady = (queryID, socket) => {
    console.log('recieved')
    if (matches[queryID]) {
        let currentMatch = matches[queryID];
        let { p1, p2 } = currentMatch;
        p1.ready = (socket.id == p1.sid) ? true : p1.ready;
        p2.ready = (socket.id == p2.sid) ? true : p2.ready;
        console.log('mega recieved\n' + p1.ready + p2.ready);
        if (p1.ready && p2.ready) {
            startMatch(queryID);
        }
    }
}

const startMatch = (queryID) => {
    let currentMatch = matches[queryID];
    currentMatch.currentWord = getRandomWord();
    io.to(queryID).emit('gameStart', currentMatch.currentWord);
}

const newWord = (queryID, socket) => {
    let currentMatch = matches[queryID];
    currentMatch.currentWord = getRandomWord();
    io.to(queryID).emit('newWord', {word: currentMatch.currentWord, score: [currentMatch.p1.score, currentMatch.p2.score]});
}

const endMatch = (queryID, socket) => {

}

const inputHandler = (socket, { text, queryID }) => {
    if (matches[queryID]) {
        let currentMatch = matches[queryID];
        if (socket.id == currentMatch.p1.sid || currentMatch.p2.sid) { 
            let { p1, p2, currentWord } = currentMatch;
            let currentPlayer = (socket.id == p1.sid) ? p1 : p2;
            currentPlayer.typed = text;
            console.log(currentPlayer.typed + " : " + currentWord);
            if (currentPlayer.typed == currentWord) {
                currentPlayer.score += 1;
                console.log('pls')
                if (currentPlayer.score > currentMatch.maxScore) { //the win
                    endMatch(queryID, socket);
                    console.log('???')
                }else {
                    console.log('ok')
                    newWord(queryID, socket);
                }
            }else{
                socket.broadcast.to(queryID).emit('p2typed', currentPlayer.typed);
            }
        }
    }    
}

const connection = (socket) => {
    console.log('got connection');
    console.log(getRandomWord());
    socket.on('login', (data) => {
        socket.handshake.session.reload(err => { 
            if (err) {
                console.log(err)
            }
        });
    });
    socket.on('matchJoin', async (data) => matchJoin(data, socket));

    socket.on('ready', (data) => playerReady(data, socket));

    socket.on('type', (data) => inputHandler(socket, data));
};

module.exports = function(server, session){ //initialize socket 
    io = socket(server)
    io.use(sharedsession(session, {
        autoSave: true
    }));
    
    io.on('connection', (socket) => connection(socket));

    io.on('disconnect', () => console.log('disconnected'));
};