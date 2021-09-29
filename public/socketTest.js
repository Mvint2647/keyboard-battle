var socket = io();

let input = document.getElementById("player1");

input.addEventListener("keydown",(e) =>{
  console.log(e.code)
  if (e.code) {
    socket.emit('type', e.code);
  }
});