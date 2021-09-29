var socket = io();

const input = document.getElementById("player1");
const p2Display = document.getElementById('player2')
var previousInput = "";
var p2String = "";

input.addEventListener("keyup",(e) =>{
    socket.emit('type', input.value);
});

socket.on('p2typed', (data) => {
    p2Display.value = data;
});