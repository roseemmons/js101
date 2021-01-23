// VARIABLES
const readline = require('readline-sync');

const DEFAULT_LANG = 'en';
const GAME_TEXT = require('./rpsls_text.json');

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
let numberOfRounds = 1;


// FUNCTIONS
function getGameText(textToRetrieve, lang = DEFAULT_LANG) {
  return GAME_TEXT[lang][textToRetrieve];
}

function displayGameMessage(msg) {
  console.log(`${msg}`);
}

function displayGameWinner(gameWinner) {
  let result = null;
  let scoreMessage = `${getGameText('playerName')}: ${playerScore} ${getGameText('competitorName')}: ${computerScore}\n`;

  if (gameWinner === 'player') {
    result = getGameText('playerWinsMessage');
  } else if (gameWinner === 'computer') {
    result = getGameText('computerWinsMessage');
  } else {
    result = getGameText('tiedGameMessage');
  }

  displayGameMessage(result);
  displayGameMessage( getGameText('scoreMessageHeader') );
  displayGameMessage(scoreMessage);
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

  numberOfRounds += 1;
  return winner;
}

// LOGIC
while (playerScore < 5 && computerScore < 5) {
  // Display the welcome text only if the we're on the first round
  if (numberOfRounds === 1) {
    displayGameMessage( getGameText('welcome') );
  }

  // Display the round number
  displayGameMessage(`\n== ${getGameText('gameRoundNumber')} ${numberOfRounds} ==`);

  // Get the player's selection
  displayGameMessage( getGameText('selectionInstructions') );
  let playerSelection = readline.question();

  // Test for an invalid entry by the player
  while (!['1', '2', '3', '4', '5'].includes(playerSelection)) {
    displayGameMessage( getGameText('selectionError') );
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
  displayGameMessage(`${getGameText('playerSelectionMessage')} ${playerChoice}.`);

  // Computer Selection
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];
  displayGameMessage(`${getGameText('computerSelectionMessage')} ${computerChoice}.`);

  let winnerOfTheGame = decideGameWinner(playerChoice, computerChoice);
  displayGameWinner(winnerOfTheGame);
}

displayGameMessage( getGameText('goodbye') );