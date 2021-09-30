const socket = io();

const input = document.getElementById("player1");
const p2Display = document.getElementById('player2')
const loginBtn = document.getElementById('login');

var previousInput = "";
var p2String = "";

async function login() {
    const email = prompt("enter player id");
    const response = await fetch('/test/login', {
        method: 'POST',
        body: JSON.stringify({ email }),
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