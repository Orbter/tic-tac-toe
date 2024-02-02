const gameBoard = [
  [, , ,],
  [, , ,],
  [, , ,],
];
console.log(gameBoard);
let board = document.querySelector(".gameboard");
let turn;

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

  // Check top-left to bottom-right diagonal
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

  // Check top-right to bottom-left diagonal
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

function playersChoice(player1, player2) {
  child = event.target;
  console.log(child);
  if (child.classList.contains("played")) {
    return;
  } else {
    const userInstance = new User(player1, player2);
    const user = userInstance.user;
    const opponent = userInstance.opponent;
    let container;
    let symbol = document.createElement("img");
    container = event.target.id;
    container = parseInt(container);
    turn = whoTurn(turn);

    if (turn) {
      symbol.src = "imgs/close__2_-removebg-preview.svg";
      symbol.alt = "X";
      insertPlayArray(gameBoard, container, "X");
    } else {
      symbol.alt = "O";
      symbol.src = "imgs/o-removebg-preview.svg";
      insertPlayArray(gameBoard, container, "O");
    }
    console.log(gameBoard);
    child.appendChild(symbol);
    child.classList.add("played");
  }
}

board.addEventListener("click", function (event) {
  if (event.target.classList.contains("board")) {
    playersChoice("Player1Name", "Player2Name");
    console.log(checkIfWin(gameBoard));
  }
});
function insertPlayArray(board, counter, objects) {
  //when yotam cheks this was made with chat gtp i am sry
  const row = Math.floor(counter / 3);
  const col = counter % 3;
  board[row][col] = objects;
}
