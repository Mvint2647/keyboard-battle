let params = (new URL(document.location)).searchParams;
let redirect = (params) ? params.get("r") : null;

function showSignup() {
    document.querySelector('#myDIV').classList.remove('hiddenEl');
}

const loginForm = async (event) => {
    event.preventDefault();
    console.log("test");

    const email = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();


    if (email && password) {
        const response = await fetch('/api/player/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace((redirect) ? `/match/${redirect}` : '/');

        } else {
            alert('Failed to log in.');
        }
    }
};


const signupForm = async (event) => {
    event.preventDefault();
    console.log("dear god please")
    const name = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (name && email && password) {
        const response = await fetch('/api/player', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up.');
        }
    }
};


document
    .querySelector('#login')
    .addEventListener('submit', loginForm);

document
    .querySelector('#signup')
    .addEventListener('submit', signupForm);

