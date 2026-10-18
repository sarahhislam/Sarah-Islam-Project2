let numberOfMoves = 0;
let time = 0;
let timerInterval = null;

window.onload = function() {
    startTimer();
    startNewGame();
};

function startTimer() {
    clearInterval(timerInterval);
    time = 0;
    timerInterval = setInterval(() => {
        time++;
        document.getElementById("timeCount").innerText = "Time spent in the current game: " + time + " seconds.";
    }, 1000);
}

function swapTiles(cell1Id, cell2Id) {
    let cell1 = document.getElementById(cell1Id);
    let cell2 = document.getElementById(cell2Id);
    
    let tempClass = cell1.className;
    cell1.className = cell2.className;
    cell2.className = tempClass;
    
    numberOfMoves++;
    document.getElementById("moveCount").innerText = "Number of Moves thus far: " + numberOfMoves;
}

function clickTile(row, column) {
    let cellId = "cell" + row + column;
    let cell = document.getElementById(cellId);
    let tile = cell.className;

    if (tile !== "tile16") {
        if (column < 4 && document.getElementById("cell" + row + (column + 1)).className === "tile16") {
            swapTiles(cellId, "cell" + row + (column + 1));
            setTimeout(() => { win(); }, 1000);
            return;
        }
        if (column > 1 && document.getElementById("cell" + row + (column - 1)).className === "tile16") {
            swapTiles(cellId, "cell" + row + (column - 1));
            setTimeout(() => { win(); }, 1000);
            return;
        }
        if (row < 4 && document.getElementById("cell" + (row + 1) + column).className === "tile16") {
            swapTiles(cellId, "cell" + (row + 1) + column);
            setTimeout(() => { win(); }, 1000);
            return;
        }
        if (row > 1 && document.getElementById("cell" + (row - 1) + column).className === "tile16") {
            swapTiles(cellId, "cell" + (row - 1) + column);
            setTimeout(() => { win(); }, 1000);
            return;
        }
    }
}

function startNewGame() {
    numberOfMoves = 0;
    document.getElementById("moveCount").innerText = "Number of Moves thus far: " + numberOfMoves;
    startTimer();

    let tiles = [];
    for (let i = 1; i <= 16; i++) {
        tiles.push("tile" + i);
    }

    for (let i = tiles.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = tiles[i];
        tiles[i] = tiles[j];
        tiles[j] = temp;
    }

    let index = 0;
    for (let r = 1; r <= 4; r++) {
        for (let c = 1; c <= 4; c++) {
            document.getElementById("cell" + r + c).className = tiles[index];
            index++;
        }
    }
}

function startSimpleGame() {
    numberOfMoves = 0;
    document.getElementById("moveCount").innerText = "Number of Moves thus far: " + numberOfMoves;
    startTimer();

    for (let r = 1; r <= 4; r++) {
        for (let c = 1; c <= 4; c++) {
            let tileNum = (r - 1) * 4 + c;
            document.getElementById("cell" + r + c).className = "tile" + tileNum;
        }
    }

    document.getElementById("cell42").className = "tile16";
    document.getElementById("cell44").className = "tile14";
}

function win() {
    if (
        document.getElementById("cell11").className === "tile1" &&
        document.getElementById("cell12").className === "tile2" &&
        document.getElementById("cell13").className === "tile3" &&
        document.getElementById("cell14").className === "tile4" &&
        document.getElementById("cell21").className === "tile5" &&
        document.getElementById("cell22").className === "tile6" &&
        document.getElementById("cell23").className === "tile7" &&
        document.getElementById("cell24").className === "tile8" &&
        document.getElementById("cell31").className === "tile9" &&
        document.getElementById("cell32").className === "tile10" &&
        document.getElementById("cell33").className === "tile11" &&
        document.getElementById("cell34").className === "tile12" &&
        document.getElementById("cell41").className === "tile13" &&
        document.getElementById("cell42").className === "tile14" &&
        document.getElementById("cell43").className === "tile15" &&
        document.getElementById("cell44").className === "tile16"
    ) {
        clearInterval(timerInterval);
        window.alert(
            "CONGRATULATIONS!\n\nYou've successfully reordered the puzzle numbers in sequential order!\n\n" +
            "Number of moves it took to complete: " + numberOfMoves + "\n" +
            "Time spent to complete it: " + time + " second(s).\n\nTo play again, click OK"
        );
        window.location.reload();
    }
}