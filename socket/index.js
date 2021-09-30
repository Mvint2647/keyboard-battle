const socket = require('socket.io');
const sharedsession = require("express-socket.io-session");


//the game logic will be programmed here for now, may eventually be modularized

const connection = (socket) => {
    console.log('got connection');
    socket.on('login', (data) => {
        socket.handshake.session.reload(err => { 
            if (err) {
                console.log(err)
            }
        });
    });
    socket.on('type', (data) => {
        socket.handshake.session.testValue = true;
        //socket.handshake.session.save();
        console.log(socket.handshake.session);
        socket.broadcast.emit('p2typed', data);
    });
};

module.exports = function(server, session){
    var io = socket(server)
    io.use(sharedsession(session, {
        autoSave: true
    }));
    
    io.on('connection', (socket) => connection(socket));

    
    //io.on('disconnect', console.log('connected'));
};