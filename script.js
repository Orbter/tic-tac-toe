const gameBoard = [
  [, , ,],
  [, , ,],
  [, , ,],
];
let board = document.querySelector(".gameboard");
let turn;
let playerScore = 0;
let opponentScore = 0;
function matrixLength(board) {
  const numberOfRows = board.length;
  const numberOfColumns = board[0].length;
  const totalElements = numberOfRows * numberOfColumns;
  return { totalElements, numberOfColumns, numberOfRows };
}
function checkRows(board) {
  let isWin = false;
  let sameInLine = true;
  let { numberOfRows, numberOfColumns } = matrixLength(board);
  for (let i = 0; i < numberOfRows; i++) {
    sameInLine = true;

    for (let k = 0; k < numberOfColumns - 1; k++) {
      let currentNumber = board[i][k];
      let nextNumber = board[i][k + 1];
      if (!currentNumber || currentNumber !== nextNumber) {
        sameInLine = false;
        break;
      }
    }
    if (sameInLine) {
      isWin = true;
      break;
    }
  }
  return isWin;
}
function checkColumns(board) {
  let isWin = false;
  let sameInLine = true;
  let { numberOfRows, numberOfColumns } = matrixLength(board);
  for (let i = 0; i < numberOfColumns; i++) {
    sameInLine = true;
    for (let k = 0; k < numberOfRows - 1; k++) {
      let currentNumber = board[k][i];
      let nextNumber = board[k + 1][i];
      if (!currentNumber || currentNumber !== nextNumber) {
        sameInLine = false;
        break;
      }
    }
    if (sameInLine) {
      isWin = true;
      break;
    }
  }
  return isWin;
}
function diagonal(board) {
  let { numberOfRows, numberOfColumns } = matrixLength(board);
  let isWin = true;

  let currentNumber = board[0][0];
  for (let i = 1; i < numberOfRows && i < numberOfColumns; i++) {
    if (!currentNumber || board[i][i] !== currentNumber) {
      isWin = false;
      break;
    }
  }
  if (isWin) {
    return true;
  }
  isWin = true;
  currentNumber = board[0][numberOfColumns - 1];
  for (let i = 1; i < numberOfRows && i < numberOfColumns; i++) {
    if (!currentNumber || board[i][numberOfColumns - 1 - i] !== currentNumber) {
      isWin = false;
      break;
    }
  }

  return isWin;
}
function displayNone() {
  const screen = document.querySelector(".lets-play");
  // Add the fade-out class to start the opacity transition
  screen.classList.add("fade-out");

  // Wait for the transition to complete before hiding
  setTimeout(() => {
    screen.style.display = "none";
  }, 650);
}

function checkIfWin(board) {
  if (
    diagonal(board) === true ||
    checkColumns(board) === true ||
    checkRows(board) === true
  ) {
    return true;
  } else {
    return false;
  }
}
console.log(checkIfWin(gameBoard));

const User = function (user, opponent) {
  this.user = user;
  this.opponent = opponent;
};

function whoTurn(turn) {
  if (turn === undefined) {
    return true;
  } else {
    return !turn;
  }
}
function isBoardFull(board) {
  let test;
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      if (board[row][col] === undefined || board[row][col] === null) {
        return false;
      } else {
        test = true;
      }
    }
  }
  return test;
}

function playersChoice() {
  child = event.target;
  console.log(child);
  if (child.classList.contains("played")) {
    return;
  } else {
    let container;
    let symbol = document.createElement("img");
    container = event.target.id;
    container = parseInt(container);
    turn = whoTurn(turn);

    if (turn) {
      symbol.src = "imgs/close__2_-removebg-preview.svg";
      symbol.alt = "X";
      symbol.classList.add("player-move");
      insertPlayArray(gameBoard, container, "X");
    } else {
      symbol.alt = "O";
      symbol.src = "imgs/o-removebg-preview.svg";
      symbol.classList.add("player-move");

      insertPlayArray(gameBoard, container, "O");
    }
    console.log(gameBoard);
    child.appendChild(symbol);
    child.classList.add("played");
    return symbol.alt;
  }
}
function restartArray(board) {
  let { numberOfRows, numberOfColumns } = matrixLength(board);

  for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0; col < numberOfColumns; col++) {
      board[row][col] = undefined;
    }
  }
}
function restartImg() {
  const tiles = document.querySelectorAll(".board");
  tiles.forEach(function (tile) {
    const images = tile.querySelectorAll("img");
    tile.classList.remove("played");

    images.forEach(function (image) {
      image.remove(); // Correctly calls the remove method on each image
    });
  });
}

function restart() {
  restartArray(gameBoard);
  restartImg();
}

board.addEventListener("click", function (event) {
  const OScore = document.querySelector(".o-score");
  const XScore = document.querySelector(".X-score");
  if (event.target.classList.contains("board")) {
    if (!isBoardFull(gameBoard)) {
      let move = playersChoice();
      if (checkIfWin(gameBoard)) {
        if (move === "X") {
          playerScore++;
          XScore.innerText = playerScore;
        } else {
          opponentScore++;
          OScore.innerText = opponentScore;
        }
        popUP(move);
      }
      if (isBoardFull(gameBoard)) {
        move = "Tie";
        popUP(move);
      }
    } else {
      if (checkIfWin(gameBoard)) {
        if (move === "X") {
          playerScore++;
          XScore.innerText = playerScore;
        } else {
          opponentScore++;
          OScore.innerText = opponentScore;
        }
        popUP(move);
      } else {
        move = "Tie";
        popUP(move);
      }
    }
  }
});

function insertPlayArray(board, counter, objects) {
  //when yotam checks this was made with chat gtp i am sry
  const row = Math.floor(counter / 3);
  const col = counter % 3;
  board[row][col] = objects;
}
console.log(gameBoard[1][1]);

function popUP(move) {
  const overlay = document.getElementById("overlay");
  overlay.classList.add("overlay");
  const result = document.querySelector(".result");
  const paragraph = document.querySelector(".paragraph");
  result.classList.add("fade-in-pop");
  if (move !== "Tie") {
    paragraph.innerText = `${move} Wins!`;
  } else {
    paragraph.innerText = "Tie";
  }
}
function restartGame() {
  turn = undefined;
  const overlay = document.getElementById("overlay");
  restart();
  const result = document.querySelector(".result");
  result.classList.remove("fade-in-pop");
  overlay.classList.remove("overlay");
}
