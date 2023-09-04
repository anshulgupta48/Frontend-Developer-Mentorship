const scoreSection = document.querySelector("#score");
const gameSection = document.querySelector("#game-container");
const startNewGameButton = document.querySelector("#startNewGame");
const pauseButton = document.querySelector("#pause");
const squares = document.querySelectorAll(".square");

let highScoreH3 = document.querySelector(".highScore");
let yourScoreH3 = document.querySelector(".yourScore");
let timeLeftH3 = document.querySelector(".timeLeft");
let gameMusic = new Audio("Assets/gameMusic.mp3");
let hitMusic = new Audio("Assets/hitMusic.mp3");

let highScore = 0;
let score = 0;
let timeLeft = 60;
let hitPosition = null;
let timerId = null;
let randomMoleId = null;


startNewGameButton.addEventListener("click", () => {
    scoreSection.classList.remove("hide");
    gameSection.classList.remove("hide");
    pauseButton.classList.remove("hide");
    timeLeftH3.classList.remove("hide");
    gameMusic.currentTime = 0;
    gameMusic.play();

    timeLeft = 60;
    timerId = setInterval(countDown, 1000);
    randomMoleId = setInterval(randomMole, 1000);

    let highScoreLibrary = localStorage.getItem("highScore");
    if (highScoreLibrary === null) {
        highScoreH3.innerHTML = `High Score: ${highScore}`;
    }
    else {
        highScoreH3.innerHTML = `High Score: ${highScoreLibrary}`;
    }


    score = 0;
    yourScoreH3.innerHTML = `Your Score: ${score}`;
})


pauseButton.addEventListener("click", pauseResumeGame);




function countDown() {
    timeLeft--;
    timeLeftH3.innerHTML = `Time Left: ${timeLeft}`;

    if (timeLeft == 0) {
        gameMusic.pause();
        clearInterval(timerId);
        clearInterval(randomMoleId);

        gameSection.classList.add("hide");
        pauseButton.classList.add("hide");
        timeLeftH3.classList.add("hide");
    }
}




function randomMole() {
    squares.forEach(squares => {
        squares.classList.remove("mole");
    })

    let randomSquare = squares[Math.floor(Math.random() * squares.length)]
    randomSquare.classList.add("mole");
    hitPosition = randomSquare.id;
}




function pauseResumeGame() {
    if (pauseButton.innerText == "Pause") {
        gameMusic.pause();
        clearInterval(timerId);
        clearInterval(randomMoleId);
        timerId = null;
        randomMoleId = null;
        pauseButton.innerText = "Resume";
    }
    else {
        gameMusic.play();
        timerId = setInterval(randomMole, 1000);
        randomMoleId = setInterval(countDown, 1000);
        pauseButton.innerText = "Pause";
    }
}




function storeHighScore() {
    let highScoreLibrary = localStorage.getItem("highScore");
    if (highScoreLibrary === null) {
        highScore = 1;
        highScoreLibrary = localStorage.setItem("highScore", highScore);
        highScoreH3.innerHTML = `High Score: ${highScore}`;
    }
    else {
        if (score > highScoreLibrary) {
            highScore = score;
            highScoreLibrary = localStorage.setItem("highScore", highScore);
            highScoreH3.innerHTML = `High Score: ${highScore}`;
        }
    }
}




squares.forEach(squares => {
    squares.addEventListener("mousedown", () => {
        if (timerId !== null) {
            if (squares.id == hitPosition) {
                hitMusic.play();

                setTimeout(() => {
                    hitMusic.currentTime = 0;
                    hitMusic.pause()
                }, 1000);

                ++score;
                yourScoreH3.innerText = `Your Score ${score}`;
                storeHighScore();
                hitPosition = null;
            }
        }
    })
})