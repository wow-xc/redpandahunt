let currentScore = 0;
let previousScore = 0;
let highScore = 0;
let gameInterval;
let gameTimeout;
let timerInterval;
let gameRunning = false;

const pandaTypes = ['panda_normal', 'panda_ill', 'panda_gold'];
const pandaPoints = {
    panda_normal: 1,
    panda_ill: -1,
    panda_gold: 3
};

// 래서판다 출현 비율
const pandaProbability = [0, 0, 0, 0, 1, 2]; // 4:1:1 비율

let timeLeft = 30; // 타이머를 전역 변수로 설정

const panda = document.createElement('div'); // 판다

const image = document.getElementById('rotate-image');

function showPandas() {
    if (timeLeft <= 1) return; // 1초남기고 잡았을 때 점수버그가 있기에 1초전에 게임 중단

    const holes = document.querySelectorAll('.hole');
    const numPandas = Math.floor(Math.random() * 3) + 1; // 래서판다 랜덤으로 1~3마리
    const selectedHoles = new Set();

    for (let i = 0; i < numPandas; i++) {
        let randomHole;
        do {
            randomHole = holes[Math.floor(Math.random() * holes.length)];
        } while (selectedHoles.has(randomHole));

        selectedHoles.add(randomHole);

        const randomPandaType = pandaTypes[pandaProbability[Math.floor(Math.random() * pandaProbability.length)]];

        panda.classList.add('panda', randomPandaType);
        randomHole.appendChild(panda);
        panda.style.display = 'block';
        panda.style.position = 'relative';
        panda.style.top = '-10px';

        panda.addEventListener('click', () => {
            currentScore += pandaPoints[randomPandaType];
            document.getElementById('current-score').textContent = currentScore;
            panda.remove();
        });

        setTimeout(() => {
            panda.remove();
        }, Math.random() * 1000 + 500); //래서판다 나오는 시간
    }
}

function startGame() {
    gameRunning = true;
    document.getElementById('start-button').disabled = true;
    previousScore = currentScore;
    currentScore = 0;
    document.getElementById('current-score').textContent = currentScore;
    document.getElementById('previous-score').textContent = previousScore;
    document.getElementById('timer').textContent = 30;

    gameInterval = setInterval(showPandas, 1500);

    timeLeft = 30; // 타이머 초기화
    timerInterval = setInterval(() => {
        timeLeft -= 1;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
        }
    }, 1000);

    gameTimeout = setTimeout(() => {
        clearInterval(gameInterval);
        if (currentScore > highScore) {
            highScore = currentScore;
        }
        document.getElementById('high-score').textContent = highScore;
        document.getElementById('start-button').innerText = '게임 시작';
        document.getElementById('start-button').disabled = false;
        gameRunning = false;
    }, 20000);
}

function stopGame() {
    gameRunning = false;
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    clearTimeout(gameTimeout);
    document.getElementById('start-button').innerText = '게임 시작';
    document.getElementById('start-button').disabled = false;
}

document.getElementById('start-button').addEventListener('click', () => {
    if (gameRunning) {
        stopGame();
    } else {
        startGame();
    }
});