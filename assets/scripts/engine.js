const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        live: document.querySelector("#lives"),
    },
    values: {
        hitPosition: 0,
        result: 0,
        currentTime: 10,
        currentLive: 3,
    },
    actions: {
        countDownTimerId: null, //setInterval(countDown, 1000),
        timerId: null, //setInterval(randomSquare, 1000),
        timeOutId: null,
    }
}

function loseLive() {
    state.values.currentLive--;
    state.view.live.textContent = state.values.currentLive;

    if (state.values.currentLive <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Suas vidas acabaram! Você perdeu!");
        resetGame();
    }
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Tempo esgotado! O seu resultado foi: " + state.values.result);
        resetGame();
    } else {
        if (state.values.hitPosition !== null) {
            loseLive();
        }
    }
}

function playSound(audioName) {
    let audio = new Audio(`./assets/sounds/${audioName}.m4a`);
    audio.volume = .1;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * state.view.squares.length);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
                clearTimeout(state.actions.timeOutId);
            }
        });
    });
}

function resetGame() {
    state.values.currentLive = 3;
    state.values.currentTime = 10;
    state.values.result = 0;
    state.view.timeLeft.textContent = state.values.currentTime;
    state.view.score.textContent = state.values.result;
    state.view.live.textContent = state.values.currentLive;

    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    state.actions.timerId = setInterval(randomSquare, 1000);
}

function initialize() {
    addListenerHitBox();
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    state.actions.timerId = setInterval(randomSquare, 1000);
}

initialize();