const socket = require('socket.io');
const sharedsession = require("express-socket.io-session");
const { Match, Text } = require('../models');

//the game logic will be programmed here for now, may eventually be modularized
var matches = { //matches will keep track of queryIDs and the socketids of each player 
}

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
            player1SID: null,
            player2SID: null
        }
    }

    //are they the player who created the match? if not, theyll join as player two if no one else has. otherwise, theyll spectate
    if (currentSession.playerID == requestedMatch.player1_id){
        matches[requestedMatch.queryID].player1SID = socket.id;
        console.log("player 1 is here");
    } else if (!requestedMatch.player2_id || currentSession.playerID == requestedMatch.player2_id) {
        matches[requestedMatch.queryID].player2SID = socket.id;
        requestedMatch.player2_id = currentSession.playerID;
        await requestedMatch.save();
        console.log(`Player 2 has joined. Their id is ${currentSession.playerID}`);
    }
}

const inputHandler = (socket, { text, queryID }) => {
    if (matches[queryID]) {
        let currentMatch = matches[queryID];
        console.log(currentMatch);
        console.log(socket.id);
        if (socket.id == currentMatch.player1SID || currentMatch.player2SID) {
            //get the socket.id of the other player
            let otherSID = (socket.id == currentMatch.player1SID) ? currentMatch.player2SID : currentMatch.player1SID; 
            socket.broadcast.to(otherSID).emit('p2typed', text);
        }
    }    
}

const connection = (socket) => {
    console.log('got connection');
    socket.on('login', (data) => {
        socket.handshake.session.reload(err => { 
            if (err) {
                console.log(err)
            }
        });
    });
    socket.on('matchJoin', async (data) => matchJoin(data, socket))

    socket.on('type', (data) => inputHandler(socket, data));
    //     console.log(socket.handshake.session);
    //     socket.broadcast.emit('p2typed', data);
    // });
};

module.exports = function(server, session){ //initialize socket 
    var io = socket(server)
    io.use(sharedsession(session, {
        autoSave: true
    }));
    
    io.on('connection', (socket) => connection(socket));

    
    io.on('disconnect', () => console.log('disconnected'));
};