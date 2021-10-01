const socket = io();

const input = document.getElementById("player1");
const p2TextDisplay = document.getElementById('player2');
const textDisplayEl = document.getElementById('gameStateText');
const myScoreDisplay = document.getElementById('myScore');
const p2ScoreDisplay = document.getElementById('p2Score');
const matchID = window.location.href.substring(window.location.href.lastIndexOf("/")+1, window.location.href.length);
var myPID = null; //tells them which score is theirs
var p2PID;
var previousInput = "";
var p2String = "";



socket.on('gameStart', (word) => {
    textDisplayEl.textContent = word;
    input.removeAttribute('disabled');
});

socket.on('matchCreated', (pid) => {
    myPID = pid;
    p2PID = (pid == 1) ? 0 : 1;
    socket.emit('ready', matchID);
});

socket.on('newWord', ({word, score}) => {
    textDisplayEl.textContent = word;
    myScoreDisplay.textContent = `P1 Score: ${score[myPID]}`;
    p2ScoreDisplay.textContent = `P2 Score: ${score[p2PID]}`;
    input.value = "";
    p2TextDisplay.value = "";
});

window.addEventListener("load", () => {
    socket.emit('matchJoin', matchID);//wait before sending otherwise this client wont be ready to recieve messages  
});

input.addEventListener('keyup',(e) =>{
    socket.emit('type', { text: input.value, queryID: matchID });
});

socket.on('p2typed', (data) => {
    p2TextDisplay.value = data;
});

