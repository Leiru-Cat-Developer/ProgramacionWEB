let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'Rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'Paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'Scissors';
    }

    return computerMove;
}

//PLAYING WITH LISTENER
document.querySelector('.js-rock-button')
.addEventListener('click',() => {
    playGame('Rock');
});
document.querySelector('.js-paper-button')
.addEventListener('click',() => {
    playGame('Paper');
});
document.querySelector('.js-scissors-button')
.addEventListener('click',() => {
    playGame('Scissors');
});

//RESET WITH LISTENER
document.querySelector('.js-reset')
.addEventListener('click',() => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
});

//PLAYING THE KEYBOARD
document.body.addEventListener('keydown', (event) => {
    switch (event.key){
        case 'r':
            playGame('Rock');
            break;
        case 'p':
            playGame('Paper');
            break;
        case 's':
            playGame('Scissors');
            break;
    }
});

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    if (playerMove === 'Rock') {
        if (computerMove === 'Rock') {
            result = 'TIE';
        } else if (computerMove === 'Paper') {
            result = 'YOU LOSE';
        } else if (computerMove === 'Scissors') {
            result = 'YOU WIN';
        }
    } else if (playerMove === 'Paper') {
        if (computerMove === 'Rock') {
            result = 'YOU WIN';
        } else if (computerMove === 'Paper') {
            result = 'TIE';
        } else if (computerMove === 'Scissors') {
            result = 'YOU LOSE';
        }
    } else if (playerMove === 'Scissors') {
        if (computerMove === 'Rock') {
            result = 'YOU LOSE';
        } else if (computerMove === 'Paper') {
            result = 'YOU WIN';
        } else if (computerMove === 'Scissors') {
            result = 'TIE';
        }
    }

    if (result === 'YOU WIN') {
        score.wins++;
    } else if (result === 'YOU LOSE') {
        score.losses++;
    } else if (result === 'TIE') {
        score.ties++;
    }

    //LOCAL STORAGE, THIS ONLY ALLOWS STRINGS THAT'S WHY WE NEED TO CONVERT JS TO JSON
    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();
    updateResult(result);
    updateMoves(playerMove, computerMove);
}

let isAutoPlaying = false;
let intervalID;

function autoPlay() {
    if (!isAutoPlaying) {
        //THE INTERVAL GENERATES AN ID WHICH CHANGES EVERYTIME
        intervalID = setInterval(() => {
            const playerMove = pickComputerMove();
            //IS PLAYING AUTOMATICALLY EVERY 2 SECS
            playGame(playerMove);
        },2000);
        isAutoPlaying = true;
    }else {
        clearInterval(intervalID);
        isAutoPlaying = false;
    }
}

function updateScoreElement() {
    document.querySelector('.js-score')
    .innerHTML = `WINS: ${score.wins}, LOSSES: ${score.losses}, TIES: ${score.ties}`;
}
function updateResult(result) {
    document.querySelector('.js-result')
        .innerHTML = `${result}`;
}
function updateMoves(playerMove, computerMove) {
    document.querySelector('.js-moves')
    .innerHTML =
    `You choose: <img src="thumbnails/${playerMove}-emoji.png" class="move-icon">
    ,computer chooses:<img src="thumbnails/${computerMove}-emoji.png" class="move-icon">`;
}