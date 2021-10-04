const socket = io();

const matchBtn = document.getElementById('createMatch');
const linkDisplay = document.getElementById('linkText');

matchBtn.addEventListener('click', async () => {
    const request = await fetch('/api/match/create');
    const response = await request.json();
    if (response.err) {
        document.location.replace('/login');
    }
    linkDisplay.innerHTML = `Send someone this link to play with them!<br><span id='url'>${window.location.href}match/${response.url}</span><br>Just click to copy it!`;
    linkDisplay.classList.remove('hiddenEl');
    let urlEl = document.querySelector('#url');
    socket.emit("homepageCreation", response.url);
});

linkDisplay.onclick = () => {
    document.execCommand("copy");
}

linkDisplay.addEventListener("copy", (event) => {
    event.preventDefault();
    if (event.clipboardData) {
        event.clipboardData.setData("text/plain", document.querySelector('#url').textContent);
        console.log(event.clipboardData.getData("text"))
    }
})

socket.on("joinMatch", (queryID) => {
    document.location.replace(`/match/${queryID}`);
})