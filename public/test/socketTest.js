var socket = io();

const input = document.getElementById("player1");
const p2Display = document.getElementById('player2')
const loginBtn = document.getElementById('login');

var previousInput = "";
var p2String = "";

async function login() {
    const response = await fetch('/test/login', {
        method: 'POST',
        body: JSON.stringify({ email: "test@test.com" }),
        headers: { 'Content-Type': 'application/json' },
    });
    if(response.ok) {
        let json = await response.json();
        socket.emit('login', json.message);
        console.log(json);
    }
}

input.addEventListener("keyup",(e) =>{
    socket.emit('type', input.value);
});

socket.on('p2typed', (data) => {
    p2Display.value = data;
});