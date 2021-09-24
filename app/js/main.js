const screens = document.querySelectorAll('.screen');
const gameContainer = document.getElementById('game-container');

const startBtn = document.getElementById('start-btn');
const playBtn = document.getElementById('paly-btn');

const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');
const message2 = document.getElementById('message2');

let seconds = 0;
let score = 0;

startBtn.addEventListener('click', () => screens[0].classList.add('up'));

playBtn.addEventListener('click', () => {
    screens[1].classList.add('up');
    setTimeout(createHeart, 1000);
    startGame();
});

function startGame(){
    setInterval(increaseTime, 1000);
}

function increaseTime(){
    let m = Math.floor(seconds/60);
    let s = seconds % 60;

    m = m< 10 ? `0${m}` : m;
    s = s< 10 ? `0${s}` : s;

    timeEl.innerHTML = `Время: ${m}:${s}`;
    seconds ++;

}

function createHeart(){
    const heart = document.createElement('div');
    const { x, y } = getRandomLocation();

    heart.classList.add('heart');
    heart.style.top = `${y}px`;
    heart.style.left = `${x}px`;
    heart.innerHTML = ` <img src="images/heart.png" alt="heart" style="transform: rotate(${Math.random() * 360}deg)">`;

    heart.addEventListener('click', catchHeart);

    gameContainer.appendChild(heart);
}

function getRandomLocation(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) +100;
    const y = Math.random() * (height - 200) +100;
    return { x, y };
}

function catchHeart(){
    increaseScore();
    this.classList.add('caught');
    setTimeout(() => this.remove(), 2000);
    addHearts();
}

function addHearts(){
    setTimeout(createHeart, 1000);
    setTimeout(createHeart, 1500);
}

function increaseScore(){
    score++;
    if(score >19){
        message.classList.add('visible');
    };
    if (score> 25){
        message.classList.remove('visible');
        message2.classList.add('visible');
    }
    scoreEl.innerHTML = `Количество сердец: ${score}`;
}