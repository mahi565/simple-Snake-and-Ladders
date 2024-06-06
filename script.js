document.getElementById('roll-btn').addEventListener('click', function() {
    var diceRoll = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice-roll').innerText = "You rolled a " + diceRoll;
    movePlayer(diceRoll);
});

function movePlayer(steps) {
    var player = document.getElementById('player');
    var currentPosition = parseInt(player.dataset.position) || 0;
    var newPosition = currentPosition + steps;
    if (newPosition <= 100) {
        player.dataset.position = newPosition;
        updatePlayerPosition();
        checkSnakeOrLadder(newPosition);
    }
}

function updatePlayerPosition() {
    var player = document.getElementById('player');
    var currentPosition = parseInt(player.dataset.position);
    var cell = document.querySelector(`.cell-${currentPosition}`);
    var cellRect = cell.getBoundingClientRect();
    player.style.left = cellRect.left + 'px';
    player.style.top = cellRect.top + 'px';
}

function generateBoard() {
    var board = document.getElementById('board');
    for (var i = 0; i < 100; i++) {
        var cell = document.createElement('div');
        cell.classList.add('cell');
        cell.classList.add(`cell-${i + 1}`);
        cell.innerText = i + 1;
        board.appendChild(cell);
    }
    // Add snakes and ladders
    for (var snake in snakes) {
        var start = snake;
        var end = snakes[snake];
        addSnakeOrLadder(start, end, 'snake');
    }
    for (var ladder in ladders) {
        var start = ladder;
        var end = ladders[ladder];
        addSnakeOrLadder(start, end, 'ladder');
    }
}

function addSnakeOrLadder(start, end, type) {
    var startCell = document.querySelector(`.cell-${start}`);
    var endCell = document.querySelector(`.cell-${end}`);
    var div = document.createElement('div');
    div.classList.add(type);
    startCell.appendChild(div);
    var rect1 = startCell.getBoundingClientRect();
    var rect2 = endCell.getBoundingClientRect();
    var divRect = div.getBoundingClientRect();
    var xOffset = (rect2.left - rect1.left) + (rect2.width - divRect.width) / 2;
    var yOffset = (rect2.top - rect1.top) + (rect2.height - divRect.height) / 2;
    div.style.left = xOffset + 'px';
    div.style.top = yOffset + 'px';
}

function checkSnakeOrLadder(position) {
    if (snakes[position]) {
        alert(`Oops! You landed on a snake. Moving from ${position} to ${snakes[position]}`);
        movePlayer(snakes[position] - position);
    } else if (ladders[position]) {
        alert(`Yay! You found a ladder. Moving from ${position} to ${ladders[position]}`);
        movePlayer(ladders[position] - position);
    }
}

var snakes = {16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78};
var ladders = {1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100};

generateBoard();
updatePlayerPosition();
