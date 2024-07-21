//검 정보 배열
const hammers = [
    { name: '빨강', img: './images/hammers/1.png', success: 0.99 },
    { name: '동', img: './images/hammers/2.png', success: 0.85 },
    { name: '은', img: './images/hammers/3.png', success: 0.8 },
    { name: '황금', img: './images/hammers/4.png', success: 0.75 },
    { name: '플라티넘', img: './images/hammers/5.png', success: 0.7 },
    { name: '에메랄드', img: './images/hammers/6.png', success: 0.6 },
    { name: '다이아', img: './images/hammers/7.png', success: 0.5 },
    { name: '루비', img: './images/hammers/8.png', success: 0.4 },
    { name: '무지개', img: './images/hammers/9.png', success: 0.35 },
]

let level = 0; //뿅망치 단계
let score = 0; //점수 변수

const positivePanda = document.querySelector(); //득점 레서판다
const negativePanda = document.querySelector(); //감점 레서판다

//뿅망치 강화 화면 업데이트
function updateInfo() {
    const hammer = hammers[level];

    const innerBox = document.querySelector('.inner_box');
    const equipImg = innerBox.getElementsByTagName('img');
    const equipName = innerBox.getElementById('equipName');
    const equipDetail = innerBox.getElementById('equipDetail');

    equipImg.src = `./images/hammers/${hammer.img}`;
    equipName.textContent = `+${level + 1} ${hammer.name} 뿅망치`;
    equipDetail.textContent = `성공 확률` + (hammer.success * 100).toFixed(0) + `%`;
}

updateInfo();

//뿅망치 강화 함수
function updateHammers() {
    const hammer = hammers[level]
    const isSuccess = Math.random() < hammer.success;

    if (isSuccess) {
        level++;
    } else { //실패한 단계의 뿅망치를 마우스 커서로 설정함
        const cursorSrc = hammer.img;

    }
    updateInfo();
}

//전체 런타임 타이머
function gameTimer() {
    const timeBoard = document.getElementById("timeBoard"); // 타이머 표시 요소 ID 추가
    let timeLeft = 30;
    let isRunning = false; // 타이머 실행 상태 변수 추가

    function startTimer() {
        if (!isRunning) { // 타이머가 실행 중이 아닐 때만 시작
            isRunning = true;

            const timer = setInterval(() => {
                timeLeft--;
                timeBoard.textContent = timeLeft;

                if (timeLeft === 0) {
                    clearInterval(timer);
                    isRunning = false;
                    endGame(); // 게임 종료 함수 호출
                }
            }, 1000); // 1초마다 업데이트
        }
    }
    setTimeout(startTimer, 3000); // 3초 후에 타이머 시작
}

//캐릭터 등장 포지션 결정
function setPosition() {

    //구멍 포지션에 맞춰서 좌표 설정

}

function moleTimer() {
    const holes = document.querySelectorAll(".hole"); // 모든 구멍 요소 선택
    let isRunning = false; // 타이머 실행 상태 변수 추가

    function showMole() {
        if (!isRunning) { // 타이머가 실행 중이 아닐 때만 시작
            isRunning = true;

            const randomIndex = Math.floor(Math.random() * holes.length); // 랜덤 구멍 선택
            const selectedHole = holes[randomIndex];
            selectedHole.classList.add("up"); // 두더지 등장

            // 랜덤 시간 후 두더지 숨김 (0.5초 ~ 1.5초 사이)
            const hideTime = Math.random() * 1000 + 500;
            setTimeout(() => {
                selectedHole.classList.remove("up");
                isRunning = false;
                // 일정 시간 후 다시 showMole 호출 (1초 ~ 2초 사이)
                const showAgainTime = Math.random() * 1000 + 1000;
                setTimeout(showMole, showAgainTime);
            }, hideTime);
        }
    }

    // 게임 시작 시 showMole 호출
    showMole();
}

function setPosition() {
    const holes = document.querySelectorAll(".hole"); // 모든 구멍 요소 선택
    const holePositions = []; // 각 구멍의 좌표를 저장할 배열

    holes.forEach(hole => {
        const rect = hole.getBoundingClientRect(); // 구멍 요소의 위치 정보 가져오기
        const x = rect.left + rect.width / 2; // 구멍 중심 x 좌표
        const y = rect.top + rect.height / 2; // 구멍 중심 y 좌표
        holePositions.push({ x, y }); // 좌표 정보 배열에 추가
    });

    function positionMole(mole) {
        const randomIndex = Math.floor(Math.random() * holePositions.length); // 랜덤 구멍 선택
        const { x, y } = holePositions[randomIndex]; // 선택된 구멍의 좌표
        mole.style.left = `${x}px`;
        mole.style.top = `${y}px`;
    }

    // 모든 두더지 요소에 대해 positionMole 함수 호출
    const moles = document.querySelectorAll(".mole");
    moles.forEach(mole => positionMole(mole));
}

//점수 업데이트 함수
function updateScore(isPositive) {
    const scoreBoard = document.getElementById("scoreBoard"); // 점수 표시 요소 ID 추가

    if (isPositive) {
        score++;
        positivePanda.classList.add("active"); // 득점 레서판다 활성화
        setTimeout(() => positivePanda.classList.remove("active"), 500); // 0.5초 후 비활성화
    } else {
        score--;
        negativePanda.classList.add("active"); // 감점 레서판다 활성화
        setTimeout(() => negativePanda.classList.remove("active"), 500); // 0.5초 후 비활성화
    }

    scoreBoard.textContent = score;
}

// 득점/감점 레서판다 클릭 이벤트 설정
positivePanda.addEventListener("click", () => updateScore(true));
negativePanda.addEventListener("click", () => updateScore(false));
