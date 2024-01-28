const gameBoard = [
  ["X", "O", "X"],
  ["O", "O", "X"],
  ["X", "O", "O"],
];
console.log(gameBoard);

const User = function (user, opponent) {
  this.user = user;
  this.opponent = opponent;
};

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

function checkIfWin() {}

function playersChoice(player1, player2) {
  User(player1, player2);
  while (!checkIfWin(gameBoard)) {}
}
