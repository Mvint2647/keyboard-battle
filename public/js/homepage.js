const socket = io();

const matchBtn = document.getElementById('createMatch');
const linkDisplay = document.getElementById('linkText');

matchBtn.addEventListener('click', async () => {
    const request = await fetch('/api/match/create');
    const response = await request.json();
    if (response.err) {
        document.location.replace('/login');
    }
    linkDisplay.textContent = `Send someone this link to play with them! \n${window.location.href}match/${response.url}`;
    linkDisplay.classList.remove('hiddenEl');
    socket.emit("homepageCreation", response.url);
});

socket.on("joinMatch", (queryID) => {
    document.location.replace(`/match/${queryID}`);
})