const socket = io();

const input = document.getElementById("player1");
const p2Display = document.getElementById('player2')
const loginBtn = document.getElementById('login');
const matchID = window.location.href.substring(window.location.href.lastIndexOf("/")+1, window.location.href.length);

var previousInput = "";
var p2String = "";

socket.emit('matchJoin', matchID);

input.addEventListener("keyup",(e) =>{
    socket.emit('type', { text: input.value, queryID: matchID });
});

socket.on('p2typed', (data) => {
    p2Display.value = data;
});