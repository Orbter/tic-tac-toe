const gameBoard = [
  [, , ,],
  [, , ,],
  [, , ,],
];
console.log(gameBoard);

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

function playersChoice(player1, player2) {
  User(player1, player2);
  while (!checkIfWin(gameBoard)) {}
}
