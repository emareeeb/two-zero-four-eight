var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function () {
    document.getElementById("restart").addEventListener("click", resetGame);
    setGame();
    document.addEventListener("keydown", handleInput);
};

function resetGame() {
    board = Array.from({ length: rows }, () => Array(columns).fill(0));
    score = 0;
    document.getElementById("score").innerText = score;
    document.getElementById("board").innerHTML = "";
    setGame();
}

function setGame() {
    board = Array.from({ length: rows }, () => Array(columns).fill(0));
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            updateTile(tile, 0);
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "tile";
    if (num > 0) {
        tile.innerText = num;
        tile.classList.add("x" + num);
    }
}

function handleInput(e) {
    let moved = false;

    if (e.key === "ArrowLeft") moved = slideLeft();
    else if (e.key === "ArrowRight") moved = slideRight();
    else if (e.key === "ArrowUp") moved = slideUp();
    else if (e.key === "ArrowDown") moved = slideDown();

    if (moved) {
        setTimeout(() => {
            setTwo();
        }, 200);
        document.getElementById("score").innerText = score;
    }
}

function slide(row) {
    row = row.filter(num => num !== 0); // Remove zeros
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }
    row = row.filter(num => num !== 0); // Remove zeros after merging
    while (row.length < columns) row.push(0); // Fill remaining spaces with zeros
    return row;
}

function slideLeft() {
    let moved = false;
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        let newRow = slide(row);
        if (JSON.stringify(newRow) !== JSON.stringify(row)) moved = true;
        board[r] = newRow;
        for (let c = 0; c < columns; c++) {
            updateTile(document.getElementById(r.toString() + "-" + c.toString()), board[r][c]);
        }
    }
    return moved;
}

function slideRight() {
    let moved = false;
    for (let r = 0; r < rows; r++) {
        let row = board[r].slice().reverse();
        let newRow = slide(row).reverse();
        if (JSON.stringify(newRow) !== JSON.stringify(board[r])) moved = true;
        board[r] = newRow;
        for (let c = 0; c < columns; c++) {
            updateTile(document.getElementById(r.toString() + "-" + c.toString()), board[r][c]);
        }
    }
    return moved;
}

function slideUp() {
    let moved = false;
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        let newRow = slide(row);
        for (let r = 0; r < rows; r++) {
            if (board[r][c] !== newRow[r]) moved = true;
            board[r][c] = newRow[r];
            updateTile(document.getElementById(r.toString() + "-" + c.toString()), board[r][c]);
        }
    }
    return moved;
}

function slideDown() {
    let moved = false;
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]].reverse();
        let newRow = slide(row).reverse();
        for (let r = 0; r < rows; r++) {
            if (board[r][c] !== newRow[r]) moved = true;
            board[r][c] = newRow[r];
            updateTile(document.getElementById(r.toString() + "-" + c.toString()), board[r][c]);
        }
    }
    return moved;
}

function setTwo() {
    let empty = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] === 0) empty.push([r, c]);
        }
    }
    if (empty.length > 0) {
        let [r, c] = empty[Math.floor(Math.random() * empty.length)];
        board[r][c] = 2;
        updateTile(document.getElementById(r.toString() + "-" + c.toString()), 2);
    }
}
