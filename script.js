document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    loginUser();
});

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    registerUser();
});

function showLogin() {
    document.getElementById('home-section').classList.add('hidden');
    document.getElementById('register-section').classList.add('hidden');
    document.getElementById('login-section').classList.remove('hidden');
}

function showRegister() {
    document.getElementById('home-section').classList.add('hidden');
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('register-section').classList.remove('hidden');
}

function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Verificar si el usuario está registrado
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        showGameMenu();
    } else {
        document.getElementById('login-error').classList.remove('hidden');
        document.getElementById('login-error').innerText = 'Correo electrónico o contraseña incorrectos.';
    }
}

function registerUser() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    if (password === confirmPassword) {
        // Añadir el nuevo usuario a la lista de usuarios registrados
        const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        users.push({ email: email, password: password });
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        showLogin();
    } else {
        document.getElementById('register-error').classList.remove('hidden');
        document.getElementById('register-error').innerText = 'Las contraseñas no coinciden.';
    }
}

function showGameMenu() {
    document.getElementById('home-section').classList.add('hidden');
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('register-section').classList.add('hidden');
    document.getElementById('games-menu-section').classList.remove('hidden');
}

function showGame(gameId) {
    document.getElementById('games-menu-section').classList.add('hidden');
    document.getElementById('game1-section').classList.add('hidden');
    document.getElementById('game2-section').classList.add('hidden');
    document.getElementById('game3-section').classList.add('hidden');

    if (gameId === 'game1') {
        document.getElementById('game1-section').classList.remove('hidden');
    } else if (gameId === 'game2') {
        document.getElementById('game2-section').classList.remove('hidden');
    } else if (gameId === 'game3') {
        document.getElementById('game3-section').classList.remove('hidden');
    }
}

function showLessons() {
    document.getElementById('games-menu-section').classList.add('hidden');
    document.getElementById('lessons-menu-section').classList.remove('hidden');
}

function startLesson(lessonType) {
    document.getElementById('lessons-menu-section').classList.add('hidden');
    if (lessonType === 'basic') {
        document.getElementById('basic-lesson-section').classList.remove('hidden');
    } else if (lessonType === 'intermediate') {
        document.getElementById('intermediate-lesson-section').classList.remove('hidden');
    } else if (lessonType === 'advanced') {
        document.getElementById('advanced-lesson-section').classList.remove('hidden');
    }
}

const words = [
    'javascript', 'programming', 'developer', 'framework', 'frontend', 'backend', 'database', 'api'
];

let selectedWord;
let guessedLetters;
let remainingGuesses;
const maxGuesses = 6;

function startHangman() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = new Set();
    remainingGuesses = maxGuesses;
    document.getElementById('message').innerText = '';
    updateGameDisplay();
}

function updateGameDisplay() {
    const wordToGuess = selectedWord.split('').map(letter => guessedLetters.has(letter) ? letter : '_').join(' ');
    document.getElementById('word-to-guess').innerText = wordToGuess;
    document.getElementById('guesses-left').innerText = `Intentos restantes: ${remainingGuesses}`;
}

function makeGuess() {
    const guessInput = document.getElementById('guess-input');
    const guess = guessInput.value.toLowerCase();
    guessInput.value = '';
    guessInput.focus();
    
    if (guess.length !== 1 || !/[a-z]/.test(guess)) {
        alert('Por favor, introduce una letra válida.');
        return;
    }

    if (guessedLetters.has(guess)) {
        alert('Ya has adivinado esa letra.');
        return;
    }

    guessedLetters.add(guess);

    if (selectedWord.includes(guess)) {
        if (selectedWord.split('').every(letter => guessedLetters.has(letter))) {
            document.getElementById('message').innerText = '¡Felicidades! Has adivinado la palabra.';
        }
    } else {
        remainingGuesses--;
        if (remainingGuesses === 0) {
            document.getElementById('message').innerText = `Juego terminado. La palabra era "${selectedWord}".`;
        }
    }

    updateGameDisplay();
}

document.addEventListener('DOMContentLoaded', startHangman);
