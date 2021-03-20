/*
** 1. Initialize deck – DONE
** 2. Deal cards to player and dealer - DONE
** 3. Player turn: hit or stay  - DONE
**    - repeat until bust or stay
** 4. If player bust, dealer wins. - IN PROG
** 5. Dealer turn: hit or stay
**    - repeat until total >= 17
** 6. If dealer busts, player wins.
** 7. Compare cards and declare winner.
*/

const readline = require("readline-sync");
const SUITS = ["Hearts", "Diamonds", "Clubs", "Spades"];
const CARDS = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];
const LIMIT = 21;
const HIT_OR_STAY_VALID_CHOICES = ["hit", "stay"];


// FUNCS
function newDeck(suitArr, cardsArr) {
  let result = {};

  suitArr.slice().forEach(element => {
    result[element] = cardsArr.slice();
  });

  return result;
}


function formattedCard(card) {
  let result = ``;
  let [suit, cardNumber] = card;
  result += `${cardNumber} of ${suit}`;
  return result;
}


function removeCardFromDeck(suit, cardIndex, deck) {
  deck[suit].splice(cardIndex, 1);
}


function pickACard(deck) {
  let result = [];
  let deckSuits = Object.keys(deck); // Grabbing this info from SUITS seemed janky.

  let randomSuitIndex = Math.floor( Math.random() * deckSuits.length );
  let randomSuit = deckSuits[randomSuitIndex];

  let randomCardIndex = Math.floor( Math.random() * deck[randomSuit].length );
  let randomCard = deck[randomSuit][randomCardIndex];

  result.push(randomSuit);
  result.push(randomCard);
  removeCardFromDeck(randomSuit, randomCardIndex, deck);
  
  return result;
}


function dealCards(deck) {
  let result = [];

  for (i = 0; i < 2; i += 1) {
    result.push( pickACard(deck) );
  }

  return result;
}


function tallyHand(hand) {
  // Example: hand = [ ['Spade', 'Ace'], ['Club', 2 ] ['Heart', 'Ace'], ['Diamond', 10 ] ]
  // Could be 34 or 14
  let numberOfAcesInHand = 0;

  let result = hand.map(function(card) {
    let cardValue = 0;
    let cardFace = card[1];

    if (cardFace === 'Ace') {
      numberOfAcesInHand += 1;
      cardValue = 11;
    } else if (cardFace === 'Jack' || cardFace === 'Queen' || cardFace === 'King') {
      cardValue = 10;
    } else {
      cardValue = cardFace;
    }
    return cardValue;

  }).reduce(function(acc, curr) {
    return acc + curr;
  });

  if (result > LIMIT && numberOfAcesInHand > 0) {
    result = result - (numberOfAcesInHand * 10);
  }

  return result;
}

function hit(hand, deck) {
  hand.push(pickACard(deck));
  return hand;
}



// LOGIC
// All of this to be moved to an init function.
let game = {
  'gamesPlayed': 0,
  'players': {
    'dealer': {
      'currentHand': 0,
      'gamesWon': 0
    },
    'player1': {
      'currentHand': 0,
      'gamesWon': 0
    }
  },
  'deck': [] // This will be populated by newDeck()
}; 


// Let's create a new deck.
game['deck'] = newDeck(SUITS, CARDS);


// Now let's deal out some cards.
game['players']['dealer']['currentHand'] = dealCards(game['deck']);
game['players']['player1']['currentHand'] = dealCards(game['deck']);


// Next, let's make it easier to access everyone's hands
let dealerHand = game['players']['dealer']['currentHand'];
let playerHand = game['players']['player1']['currentHand'];


// With all that done, let's see where we stand...
console.log(`Scores:\n Dealer hand contained: ${dealerHand} for a value of: ${tallyHand(dealerHand)}.\n Your hand contained: ${playerHand} for a value of: ${tallyHand(playerHand)}\n\n`);


// Step 1: Ask if Player 1 wants to hit?
console.log("Would you like to hit or stay?\n(Type Hit or Stay and press Enter.)");
let hitOrStayAnswer = readline.question().toLowerCase();

while ( !HIT_OR_STAY_VALID_CHOICES.includes(hitOrStayAnswer) ) {
  console.log("That is not a valid answer.\nType Hit or Stay and press Enter.");
  hitOrStayAnswer = readline.question();
}


// Step 2: Add card to the hand and tally.
// Repeat steps 1 and 2 as needed.
while (hitOrStayAnswer === "hit") {
  // Add card to the hand
  hit(playerHand, game['deck']);
  console.log(`\n\nYour hand now contains: ${playerHand}\n\n`);
  
  // Compare the hands.
  // TODO: This needs cleaning up
  if (tallyHand(playerHand) > LIMIT) {
    console.log("You busted. Dealer wins.");
    console.log(`Scores:\n Dealer hand contained: ${dealerHand} for a value of: ${tallyHand(dealerHand)}.\n Your hand contained: ${playerHand} for a value of: ${tallyHand(playerHand)}\n\n`);
    break;
  } else if (tallyHand(playerHand) === LIMIT) {
    console.log("You won the game.");
    console.log(`Scores:\n Dealer hand contained: ${dealerHand} for a value of: ${tallyHand(dealerHand)}.\n Your hand contained: ${playerHand} for a value of: ${tallyHand(playerHand)}\n\n`);
    break;
  } else {
    console.log(`Scores:\n Dealer hand contained: ${dealerHand} for a value of: ${tallyHand(dealerHand)}.\n Your hand contained: ${playerHand} for a value of: ${tallyHand(playerHand)}\n\n`);
  }

  // Lather, rinse, repeat.
  console.log("Would you like to hit or stay?");
  hitOrStayAnswer = readline.question();
}