const socket = require('socket.io');

const connection = (socket) => {
    console.log('got connection');
    socket.on('type', (data) => {
        console.log(data)
        socket.broadcast.emit('p2typed', data);
    });
} 


module.exports = function(server){
    var io = socket();
    io = io.listen(server);
    io.on('connection', (socket) => {connection(socket)});
    //io.on('disconnect', console.log('connected'));
};