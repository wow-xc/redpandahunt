let currentScore = 0;
let previousScore = 0;
let highScore = 0;
let gameInterval;
let gameTimeout;
let timerInterval;

const moleTypes = ['mole1', 'mole2', 'mole3'];
const molePoints = {
    mole1: 1,
    mole2: -1,
    mole3: 3
};

// 두더지 출현 비율
const moleProbability = [0, 0, 0, 0, 1, 2]; // 4:1:1 비율

function showMoles() {
    const holes = document.querySelectorAll('.hole');
    const numMoles = Math.floor(Math.random() * 3) + 1; // 1에서 3개의 두더지

    for (let i = 0; i < numMoles; i++) {
        const randomHole = holes[Math.floor(Math.random() * holes.length)];
        const randomMoleType = moleTypes[moleProbability[Math.floor(Math.random() * moleProbability.length)]];
        
        const mole = document.createElement('div');
        mole.classList.add('mole', randomMoleType);
        randomHole.appendChild(mole);
        mole.style.display = 'block';
        mole.style.position = 'relative';
        mole.style.top = '-10px';

        mole.addEventListener('click', () => {
            currentScore += molePoints[randomMoleType];
            document.getElementById('current-score').textContent = currentScore;
            mole.remove();
        });

        setTimeout(() => {
            mole.remove();
        }, Math.random() * 1000 + 500); // 0.5초에서 1.5초 사이의 랜덤 시간 동안 두더지 표시
    }
}

function startGame() {
    previousScore = currentScore;
    currentScore = 0;
    document.getElementById('current-score').textContent = currentScore;
    document.getElementById('previous-score').textContent = previousScore;
    document.getElementById('timer').textContent = 20;

    gameInterval = setInterval(showMoles, 1500);

    let timeLeft = 20;
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
    }, 20000);
}

document.getElementById('start-button').addEventListener('click', startGame);

// 커서 이미지 이동 처리
// document.addEventListener('mousemove', (e) => {
//     const customCursor = document.getElementById('custom-cursor');
//     customCursor.style.left = `${e.clientX}px`;
//     customCursor.style.top = `${e.clientY}px`;
// });
