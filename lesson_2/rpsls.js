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

function displayGameText(text) {
  console.log(`${text}`);
}

function getGameWinner(playersChoice, computersChoice) {
  let gameWinner = null;

  if (playersChoice === computersChoice) {
    gameWinner = 'tie';
  } else if ( WINNING_COMBINATIONS[playersChoice].includes(computersChoice) ) {
    gameWinner = 'player';
  } else {
    gameWinner = 'computer';
  }

  return gameWinner;
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

  displayGameText(result);
  displayGameText( getGameText('scoreMessageHeader') );
  displayGameText(scoreMessage);
}

function incrementNumberOfGamesWon(gameWinner) {
  if (gameWinner === 'player') {
    playerScore += 1;
  } else if (gameWinner === 'computer') {
    computerScore += 1;
  }
}

function incrementNumberOfRoundsPlayed(num) {
  numberOfRounds += num;
}

function capitalizeText(text) {
  let upperCaseFirstLetter = text[0].toUpperCase();
  let restOfTheLowercaseWord = text.slice(1);
  return upperCaseFirstLetter + restOfTheLowercaseWord;
}

// LOGIC
while (playerScore < 5 && computerScore < 5) {

  // Display the welcome text only if the we're on the first round
  if (numberOfRounds === 1) {
    displayGameText( getGameText('welcome') );
  }

  // Display the round number
  displayGameText(`\n== ${getGameText('gameRoundNumber')} ${numberOfRounds} ==`);

  // Get the player's selection
  displayGameText( getGameText('selectionInstructions') );
  let playerSelection = readline.question();

  // Test for an invalid entry by the player
  while (!['1', '2', '3', '4', '5'].includes(playerSelection)) {
    displayGameText( getGameText('selectionError') );
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
  displayGameText(`${getGameText('playerSelectionMessage')}: ${capitalizeText(playerChoice)}`);

  // Computer Selection
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];
  displayGameText(`${getGameText('computerSelectionMessage')}: ${capitalizeText(computerChoice)}`);

  // Determine the winner of the game
  let winnerOfTheGame = getGameWinner(playerChoice, computerChoice);

  //Explain why the player won
  if (winnerOfTheGame === 'player') {
    displayGameText(GAME_TEXT[DEFAULT_LANG][playerChoice][computerChoice]);
  } else if (winnerOfTheGame === 'computer') {
    displayGameText(GAME_TEXT[DEFAULT_LANG][computerChoice][playerChoice]);
  }

  incrementNumberOfGamesWon(winnerOfTheGame);
  incrementNumberOfRoundsPlayed(1);

  displayGameWinner(winnerOfTheGame);
}

displayGameText( getGameText('goodbye') );