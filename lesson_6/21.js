const readline = require("readline-sync");
const SUITS = ["Hearts", "Diamonds", "Clubs", "Spades"];
const CARDS = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];
const LIMIT = 21;


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

function hitOrStay(hand, deck) {
  let handTotal = tallyHand(hand);
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

let deckOfCards = newDeck(SUITS, CARDS);
players['dealer']['currentHand'] = dealCards(deckOfCards);
players['player1']['currentHand'] = dealCards(deckOfCards);
compareHands(players['dealer']['currentHand'], players['player1']['currentHand']);
console.log("Player 1: Hit or Stay?");
let answer = readline.question().toLowerCase()[0];
