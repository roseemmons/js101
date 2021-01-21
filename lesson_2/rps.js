/*
** In this assignment, we'll build a Rock Paper Scissors game. Rock Paper
** Scissors is a simple game played between two opponents. Both the opponents
** choose an item from rock, paper, and scissors. The winner is decided
** according to the following rules:
**
** If player a chooses rock and player b chooses scissors, player a wins.
** If player a chooses paper and player b chooses rock, player a wins.
** If player a chooses scissors and player b chooses paper, player a wins.
** If both players choose the same item, neither player wins. It's a tie.
** Our version of the game lets the user play against the computer. The game
** flow should go like this:
**
** The user makes a choice.
** The computer makes a choice.
** The winner is displayed.
** Let's get to it. Create a rock_paper_scissors.js file and type along!
*/

// VARIABLES
const readline = require('readline-sync');
const VALID_CHOICES = ["rock", "paper", "scissors"];
let playAgain = 'y';

// FUNCTIONS
function prompt(msg) {
  console.log(`=> ${msg}`);
}

function displayWinner(choice, computerChoice) {
  prompt(`You chose ${choice}. The computer chose ${computerChoice}.`);

  if ( (choice === 'rock' && computerChoice === 'scissors') ||
       (choice === 'paper' && computerChoice === 'rock') ||
       (choice === 'scissors' && computerChoice === 'paper') ) {
    prompt("You win!");
  } else if ( (choice === 'scissors' && computerChoice === 'rock') ||
              (choice === 'rock' && computerChoice === 'paper') ||
              (choice === 'paper' && computerChoice === 'scissors') ) {
    prompt("The computer wins!");
  } else {
    prompt("It's a tie.");
  }
}

// LOGIC
while (playAgain === 'y') {
  // User's Selection
  prompt(`Please enter one: ${VALID_CHOICES.join(', ')}`);
  let choice = readline.question();
  // Test for invalid entry
  while ( !VALID_CHOICES.includes(choice) ) {
    prompt("That's not a valid choice.");
    choice = readline.question();
  }

  // Computer Selection
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];

  // Play Game
  displayWinner(choice, computerChoice);

  // Play Again?
  prompt("Would you like to play again? Please type y or n.");
  playAgain = readline.question().toLowerCase();
  while (playAgain[0] !== 'n' && playAgain[0] !== 'y') {
    prompt("Invalid entry. Please type y or n.");
    playAgain = readline.question().toLowerCase();
  }
}

prompt("Thank you for playing. Good-bye!");