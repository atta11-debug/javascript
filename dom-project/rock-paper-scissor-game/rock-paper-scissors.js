let losswintie = JSON.parse(localStorage.getItem("losswintie")) || { win: 0, loss: 0, tie: 0 };

updateResultElement();

function picComputerMove() {
    let computer_selection = '';
    const randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computer_selection = 'Rock';
        console.log(`Computer picked ${computer_selection}`);
    }
    else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computer_selection = 'Paper';
        console.log(`Computer picked ${computer_selection}`);
    }
    else {
        computer_selection = 'Scissors';
        console.log(`Computer picked ${computer_selection}`);

    }
    return computer_selection;
}
let playerMove;
let autoplayeing = false;
let intervalId;
function autoPlay() {
    if (!autoplayeing) {
        intervalId = setInterval(function () {
            playerMove = picComputerMove();
            playGame(playerMove);
        }, 700);
        autoplayeing = true;
    }
    else {
        clearInterval(intervalId)
        autoplayeing = false;
    }
}

document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playGame('Rock');
    })
document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playGame('Paper');
    })
document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
        playGame('Scissors');
    })

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r' || event.key === 'R') {
        playGame('Rock');
    } else if (event.key === 'p' || event.key === 'P') {
        playGame('Paper');
    } else if (event.key === 's' || event.key === 'S') {
        playGame('Scissors');
    }

})

function playGame(playerMove) {
    const computer_selection = picComputerMove()
    let result;
    if (playerMove === 'Reset') {
        losswintie = { win: 0, loss: 0, tie: 0 };
        localStorage.removeItem('losswintie');
        updateResultElement();
        return;
    }
    if (computer_selection === 'Scissors') {
        if (playerMove === 'Rock') {
            result = 'You Win'
        }
        else if (playerMove === 'Paper') {
            result = 'You Lose'
        }
        else {
            result = 'Tie'
        }
    }
    else if (computer_selection === 'Paper') {
        if (playerMove === 'Rock') {
            result = 'You Lose'
        }
        else if (playerMove === 'Paper') {
            result = 'Tie'
        }
        else {
            result = 'You Win'
        }
    }
    else if (computer_selection === 'Rock') {
        if (playerMove === 'Rock') {
            result = 'Tie'
        }
        else if (playerMove === 'Paper') {
            result = 'You Win'
        }
        else {
            result = 'You Lose'
        }
    }
    if (result === "You Win") {
        losswintie.win++;
    }
    else if (result === "You Lose") {
        losswintie.loss++;
    }
    else {
        losswintie.tie++;
    }

    localStorage.setItem('losswintie', JSON.stringify(losswintie));
    updateResultElement();

    document.querySelector('.js-result')
        .innerHTML = `${result}`;
    document.querySelector('.js-moves')
        .innerHTML = `You <img src="images/${playerMove.toLowerCase()}-emoji.png" class="move-icon">
        <img src="images/${computer_selection.toLowerCase()}-emoji.png" class="move-icon">Computer`;
}

function updateResultElement() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${losswintie.win}, Losses: ${losswintie.loss}, Ties: ${losswintie.tie}`;
}

