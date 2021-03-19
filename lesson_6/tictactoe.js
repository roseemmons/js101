const readline = require("readline-sync");
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const WINNING_LINES = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
  [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
  [1, 5, 9], [3, 5, 7]             // diagonals
];

function prompt(msg) {
  console.log(`=> ${msg}`);
}


function displayBoard(board) {
  console.clear();

  console.log(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}`);

  console.log('');
  console.log('     |     |');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}`);
  console.log('     |     |');
  console.log('');
}


function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square++) {
    board[String(square)] = INITIAL_MARKER;
  }

  return board;
}


function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === ' ');
}


function joinOr(arr, delimeter = ", ", conjunction = "or") {
  let result = [];

  arr.forEach(function(el, idx) {
    if ( idx === arr.length - 1 && arr.length > 1 ) {
      result.push(`${conjunction} ${el}`);
    } else {
      result.push(`${el}`);
    }
  });

  if ( arr.length > 2 ) {
    result = result.join(delimeter);
  } else {
    result = result.join(' ');
  }

  return result;
}


function findAtRiskSquare(line, board, marker) {
  let markersInLine = line.map(square => board[square]);

  if (markersInLine.filter(val => val === marker).length === 2) {
    let unusedSquare = line.find(square => board[square] === INITIAL_MARKER);
    if (unusedSquare !== undefined) {
      return unusedSquare;
    }
  }

  return null;
}



function playerChoosesSquare(board) {
  let square;

  while (true) {
    // prompt(`Choose a square (${emptySquares(board).join(', ')}):`);
    prompt(`Choose a square ( ${joinOr(emptySquares(board))} ):`);
    square = readline.question().trim();
    if (emptySquares(board).includes(square)) break;

    prompt("Sorry, that's not a valid choice.");
  }

  board[square] = HUMAN_MARKER;
}


function computerChoosesSquare(board) {
  let square;

  // defense first
  for (let index = 0; index < WINNING_LINES.length; index += 1) {
    let line = WINNING_LINES[index];
    square = findAtRiskSquare(line, board, HUMAN_MARKER);
    if (square) break;
  }

  // offense
  if (!square) {
    for (let index = 0; index < WINNING_LINES.length; index += 1) {
      let line = WINNING_LINES[index];
      square = findAtRiskSquare(line, board, COMPUTER_MARKER);
      if (square) break;
    }
  }

  // just pick a random square
  if (!square) {
    let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
    square = emptySquares(board)[randomIndex];
  }

  board[square] = COMPUTER_MARKER;
}


function boardFull(board) {
  return emptySquares(board).length === 0;
}


function detectWinner(board) {
  for (let line = 0; line < WINNING_LINES.length; line += 1) {
    let [ sq1, sq2, sq3 ] = WINNING_LINES[line];

    if (
        board[sq1] === HUMAN_MARKER &&
        board[sq2] === HUMAN_MARKER &&
        board[sq3] === HUMAN_MARKER
    ) {
      return 'Player';
    } else if (
        board[sq1] === COMPUTER_MARKER &&
        board[sq2] === COMPUTER_MARKER &&
        board[sq3] === COMPUTER_MARKER
    ) {
      return 'Computer';
    }
  }

  return null;
}


function someoneWon(board) {
  return detectWinner(board);
}


while (true) {
  let board = initializeBoard();

  while (true) {
    displayBoard(board);

    computerChoosesSquare(board);
    if (someoneWon(board) || boardFull(board)) break;

    playerChoosesSquare(board);
    if (someoneWon(board) || boardFull(board)) break;
  }

  displayBoard(board);

  if (someoneWon(board)) {
    prompt(`${detectWinner(board)} won!`);
  } else {
    prompt("It's a tie!");
  }

  prompt('Play again?');
  let answer = readline.question().toLowerCase()[0];
  if (answer !== 'y') break;
}


prompt('Thanks for playing Tic Tac Toe!');