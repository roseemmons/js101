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


function compareHands(dealerHand, playerHand) {
  // If player has 21, end game via determineWinner();
  // Else, give option to hit or stay via hitOrStay();;
  console.log(`Dealer has the ${formattedCard(dealerHand[0])} and an unknown card.`);
  console.log(`Player 1 has the ${formattedCard(playerHand[0])} and the ${formattedCard(playerHand[1])} for a total of ${tallyHand(playerHand)}.`);
};



// LOGIC
let gamesPlayed = 0;

let players = {
  "dealer": {
    "currentHand": 0,
    "gamesWon": 0
  },
  "player1": {
    "currentHand": 0,
    "gamesWon": 0
  }
};

// Let's create a new deck
let deckOfCards = newDeck(SUITS, CARDS);

// Now let's deal out some cards
players['dealer']['currentHand'] = dealCards(deckOfCards);
players['player1']['currentHand'] = dealCards(deckOfCards);

// Next, we'll make it easier to access those cards
let dealerHand = players['dealer']['currentHand'];
let playerHand = players['player1']['currentHand'];

// Now let's see where we stand...
compareHands(dealerHand, playerHand);


// Step 1: Ask if Player 1 wants to hit
console.log("Would you like to hit or stay?\n(Type Hit or Stay and press Enter.)");
let hitOrStayAnswer = readline.question().toLowerCase();

while ( !HIT_OR_STAY_VALID_CHOICES.includes(hitOrStayAnswer) ) {
  console.log("That is not a valid answer.\nType Hit or Stay and press Enter.");
  hitOrStayAnswer = readline.question();
}


// Step 2: Add card to the hand and tally
// Repeat steps 1 and 2 as needed
while (hitOrStayAnswer === "hit") {
  // Add card to the hand
  hit(playerHand, deckOfCards);
  console.log(`Your hand now contains: ${playerHand}`);
  
  // Tally the hand
  if (tallyHand(playerHand) > LIMIT) {
    console.log(`You busted.`);
    break;
  } else if (tallyHand(playerHand) === LIMIT) {
    console.log(`You won the game`);
    break;
  } else {
    console.log(`You have a total of: ${tallyHand(playerHand)}`);
  }

  // Lather rinse repeat
  console.log("Would you like to hit or stay?");
  hitOrStayAnswer = readline.question();
}

console.log(`The Player 1's hand contained: ${playerHand} for a value of: ${tallyHand(playerHand)}.`);
