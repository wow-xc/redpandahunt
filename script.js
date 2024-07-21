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
