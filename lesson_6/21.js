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

function initGame(suitsArray, cardsArray) {
  // Let's set up the game object
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
    'deck': {}
  }; 
  
  // Now let's create a new deck and add it to the game's deck property
  game['deck'] = newDeck(suitsArray, cardsArray);
  
  // Finally, we deal cards out to the players
  game['players']['dealer']['currentHand'] = dealCards(game['deck']);
  game['players']['player1']['currentHand'] = dealCards(game['deck']);
  
  return game;
}


// LOGIC
// 1. Create the game object, new deck, and deal cards to the playes:
let game = initGame(SUITS, CARDS);

// 2. Let's make it easier to access everyone's hands with some variables:
let dealerHand = game['players']['dealer']['currentHand'];
let playerHand = game['players']['player1']['currentHand'];


// 3. With all that done, let's see where we stand...
// TODO: Move the scores message to a function.
console.log(`Scores:\n Dealer hand contained: ${dealerHand} for a value of: ${tallyHand(dealerHand)}.\n Your hand contained: ${playerHand} for a value of: ${tallyHand(playerHand)}\n\n`);


// 4. Ask if Player 1 wants to hit?
console.log("Would you like to hit or stay?\n(Type Hit or Stay and press Enter.)");
let hitOrStayAnswer = readline.question().toLowerCase();

while ( !HIT_OR_STAY_VALID_CHOICES.includes(hitOrStayAnswer) ) {
  console.log("That is not a valid answer.\nType Hit or Stay and press Enter.");
  hitOrStayAnswer = readline.question();
}


// 5. Add card to the hand and tally.
// Repeat steps 4 and 5 as needed.
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