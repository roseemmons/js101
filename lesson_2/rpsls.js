// VARIABLES
const readline = require('readline-sync');
const VALID_CHOICES = ["rock", "paper", "scissors", "lizard", "spock"];
const WINNING_COMBINATIONS = {
  rock:     ["lizard", "scissors"],
  paper:    ["rock", "spock"],
  scissors: ["lizard", "paper"],
  lizard:   ["paper", "spock"],
  spock:    ["rock", "scissors"]
};
let playerScore = 0;
let computerScore = 0;


// FUNCTIONS
function displayGameMessage(msg) {
  console.log(`=> ${msg}`);
}

function displayGameWinner(gameWinner) {
  let result = null;
  let scoreMessage = `== Best of 5 score ==\nYou: ${playerScore} Computer: ${computerScore}\n\n`;

  if (gameWinner === 'player') {
    result = `You won the game.\n\n`;
  } else if (gameWinner === 'computer') {
    result = `The computer won the game.\n\n`;
  } else {
    result = `It's a tie.\n\n`;
  }

  console.log(result + scoreMessage);
}

function decideGameWinner(playersChoice, computersChoice) {
  let winner = null;

  if (playersChoice === computersChoice) {
    winner = 'tie';
  } else if ( WINNING_COMBINATIONS[playersChoice].includes(computersChoice) ) {
    winner = 'player';
    playerScore += 1;
  } else {
    winner = 'computer';
    computerScore += 1;
  }

  return winner;
}

// LOGIC
while (playerScore < 5 && computerScore < 5) {
  // Player's Selection
  displayGameMessage("Please make a selection. Type a number:\n1) Rock 2) Paper 3) Scissors 4) Lizard 5) Spock");
  let playerSelection = readline.question();

  // Test for an invalid entry by the player
  while (!['1', '2', '3', '4', '5'].includes(playerSelection)) {
    displayGameMessage("That's not a valid selection. Please try again.");
    playerSelection = readline.question();
  }

  // Map the number selected to a value
  let playerChoice = null;
  switch (playerSelection) {
    case '1':
      playerChoice = 'rock';
      break;
    case '2':
      playerChoice = 'paper';
      break;
    case '3':
      playerChoice = 'scissors';
      break;
    case '4':
      playerChoice = 'lizard';
      break;
    case '5':
      playerChoice = 'spock';
      break;
  }
  displayGameMessage(`You selected ${playerChoice}.`);

  // Computer Selection
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];
  displayGameMessage(`The computer selected ${computerChoice}.`);

  let winnerOfTheGame = decideGameWinner(playerChoice, computerChoice);
  displayGameWinner(winnerOfTheGame);
}