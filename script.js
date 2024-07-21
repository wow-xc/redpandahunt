let score = 0;

function showMole() {
    const moleTypes = ['mole1', 'mole2', 'mole3'];
    const molePoints = {
        mole1: 1,
        mole2: -1,
        mole3: 3
    };
    const holes = document.querySelectorAll('.hole');
    const randomHole = holes[Math.floor(Math.random() * holes.length)];
    const randomMoleType = moleTypes[Math.floor(Math.random() * moleTypes.length)];
    
    const mole = document.createElement('div');
    mole.classList.add('mole', randomMoleType);
    randomHole.appendChild(mole);
    mole.style.display = 'block';

    mole.addEventListener('click', () => {
        score += molePoints[randomMoleType];
        document.getElementById('score').textContent = score;
        mole.remove();
    });

    setTimeout(() => {
        mole.remove();
    }, 1000);
}

setInterval(showMole, 1500);

// 커서 이미지 이동 처리
document.addEventListener('mousemove', (e) => {
    const customCursor = document.getElementById('custom-cursor');
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
});
