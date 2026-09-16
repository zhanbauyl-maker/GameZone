const startButton = document.getElementById("startButton");
const gameArea = document.getElementById("gameArea");

const scoreElement = document.getElementById("score");
const bestScoreElement = document.getElementById("bestScore");
const levelElement = document.getElementById("level");
const timerElement = document.getElementById("timer");
const gameOver = document.getElementById("gameOver");

const finalScore = document.getElementById("finalScore");
const finalBest = document.getElementById("finalBest");
const finalLevel = document.getElementById("finalLevel");

const playAgainButton = document.getElementById("playAgainButton");

let score = 0;
let time = 15;
let level = 1;
let combo = 0;

let gameRunning = false;
let timer;
let moveTimer;

let bestScore = localStorage.getItem("bestScore") || 0;

bestScoreElement.textContent = bestScore;

startButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", () => {

    gameOver.classList.remove("show");

    startGame();

});


function startGame() {

    if (gameRunning) {
        return;
    }
    gameOver.classList.remove("show");

    score = 0;
    time = 15;
    level = 1;
    combo = 0;

    gameRunning = true;

    scoreElement.textContent = score;
    timerElement.textContent = time;
    levelElement.textContent = level;

    startButton.textContent = "ИГРА ИДЁТ...";

    gameArea.innerHTML = "";

    createTarget();

    timer = setInterval(() => {

        time--;

        timerElement.textContent = time;

        if (time <= 0) {
            endGame();
        }

    }, 1000);
}


function createTarget() {

    if (!gameRunning) {
        return;
    }

    const target = document.createElement("div");

    target.classList.add("target");

    // Размер цели зависит от уровня
    const sizes = [55, 45, 38, 32, 27];

    const size = sizes[level - 1];

    target.style.width = size + "px";
    target.style.height = size + "px";


    // Случайная позиция
    const maxX = gameArea.clientWidth - size;
    const maxY = gameArea.clientHeight - size;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    target.style.left = x + "px";
    target.style.top = y + "px";


    target.addEventListener("click", () => {

        if (!gameRunning) {
            return;
        }

        // Увеличиваем combo
        combo++;

        // Обычное очко
        let points = 1;

        // Бонус за combo
        if (combo >= 5) {
            points = 2;
        }

        if (combo >= 10) {
            points = 3;
        }

        score += points;

        scoreElement.textContent = score;


        // Новый уровень каждые 5 очков
        const newLevel = Math.min(
            Math.floor(score / 5) + 1,
            5
        );

        if (newLevel !== level) {

            level = newLevel;

            levelElement.textContent = level;

            showLevelMessage();
        }


        target.remove();

        createTarget();
    });


    gameArea.appendChild(target);


    // На высоких уровнях цель начинает двигаться
    if (level >= 4) {

        const moveSpeed = level === 4 ? 700 : 450;

        moveTimer = setInterval(() => {

            if (!gameRunning || !document.body.contains(target)) {
                clearInterval(moveTimer);
                return;
            }

            moveTarget(target);

        }, moveSpeed);
    }
}


function moveTarget(target) {

    const size = target.offsetWidth;

    const maxX = gameArea.clientWidth - size;
    const maxY = gameArea.clientHeight - size;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    target.style.left = x + "px";
    target.style.top = y + "px";
}


function showLevelMessage() {

    const message = document.createElement("div");

    message.classList.add("level-message");

    message.textContent = "LEVEL " + level + " 🔥";

    gameArea.appendChild(message);

    setTimeout(() => {
        message.remove();
    }, 1000);
}


function endGame() {

    gameRunning = false;

    clearInterval(timer);
    clearInterval(moveTimer);

    gameArea.innerHTML = "";


    // Проверяем рекорд
    if (score > bestScore) {

        bestScore = score;

        localStorage.setItem(
            "bestScore",
            bestScore
        );

        bestScoreElement.textContent = bestScore;
    }


    // Показываем результаты
    finalScore.textContent = score;
    finalBest.textContent = bestScore;
    finalLevel.textContent = level;


    // Показываем GAME OVER
    gameOver.classList.add("show");

    startButton.textContent = "START";
}