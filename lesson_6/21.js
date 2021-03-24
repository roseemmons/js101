/*
** 1. Initialize deck – DONE
** 2. Deal cards to player and dealer - DONE
** 3. Player turn: hit or stay  - DONE
**    - repeat until bust or stay
** 4. If player bust, dealer wins. - DONE
** 5. Dealer turn: hit or stay - IN PROG
**    - repeat until total >= 17
** 6. If dealer busts, player wins.
** 7. Compare cards and declare winner.
*/

const readline = require("readline-sync");
const SUITS = ["Hearts", "Diamonds", "Clubs", "Spades"];
const CARDS = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];
const LIMIT = 21;

// FUNCS
// TODO: Update all function calls to one format.
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

    if ( cardFace === 'Ace' ) {
      numberOfAcesInHand += 1;
      cardValue = 11;
    } else if ( cardFace === 'Jack' || cardFace === 'Queen' || cardFace === 'King' ) {
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
  hand.push( pickACard(deck) );
  return hand;
}


function checkForBlackJack(players) {
  /*
  ** Data Structure
  **  [
  **    'Dealer',
  **    { currentHand:  [ ["Hearts", 5], ["Spades", 5] ], handValue: 10, busted: false, gamesWon: 0 }
  **  ],
  **  [
  **    'Player1',
  **    { currentHand:  [ ["Diamonds", "Ace"], ["Hearts", 10] ], handValue: 21, busted: false, gamesWon: 0 }
  **  ]
  */
  let winners = Object.entries(players).filter(player => player[1]['handValue'] === LIMIT);

  if (winners.length > 0) {
    winners.forEach(player => player[1]['gamesWon'] += 1);
  }

  return winners; 
}


function initGame(playerNames) {
  // Let's set up the game object
  let game = {
    'activeGame': true,
    'gamesPlayed': 0,
    'players': {},
    'deck': {}
  };

  playerNames.forEach(function(playerName) {
    game['players'][playerName] = {
      'currentHand': 0,
      'handValue': 0,
      'busted': false,
      'gamesWon': 0
    };
  }); 

  return game;
}


// LOGIC
// 1. Create the game object
let game = initGame( ['Dealer', 'Player1'] );


while ( game['activeGame'] ) {
  // 2. Create a new deck to pull from and update the number of games played
  game['deck'] = newDeck(SUITS, CARDS);
  game['gamesPlayed'] += 1;
  

  // 3. Create arrays for players and winners to use later
  let playerNames = Object.keys( game['players'] ); // Example: ['dealer', 'player1']


  // 4. Create welcome messages
  console.log(`*** Welcome to Command Line Black Jack! ***`);
  console.log(`Good luck to all our players: ${playerNames}\n`);
  console.log(`Round ${game['gamesPlayed']}`);


  // 5. Deal cards to all the players and tally up the hands
  playerNames.forEach(function(playerName) {
    game['players'][playerName]['currentHand'] = dealCards(game['deck']);
    game['players'][playerName]['handValue'] = tallyHand( game['players'][playerName]['currentHand'] );
    console.log(`${playerName}'s hand contained ${game['players'][playerName]['currentHand']} for a value of ${game['players'][playerName]['handValue']}.`);
  });

  // 6. Does anyone have Black Jack?
  //    If yes, end the game
  //    If no, ask each player to hit or stay
  let winners = checkForBlackJack( game['players'] );

  if (winners.length > 0) {
    let winnerNames = winners.map( player => player[0] );

    console.log("Congrats on Black Jack to these players:");
    winnerNames.forEach( winnerName => console.log(winnerName) );

  } else {
    playerNames.forEach(function(playerName) {

      if (playerName !== "Dealer") {
        let playerData = game['players'][playerName];
        let hitOrStayAnswer = null;

        do {
          console.log(`\n${playerName}, would you like to hit or stay?`);
          console.log("Type Hit or Stay and press Enter.");
          hitOrStayAnswer = readline.question().toLowerCase();

          switch (hitOrStayAnswer) {
            case "hit":  // Add card to the hand and tally the hand's value
              hit( playerData['currentHand'], game['deck'] );
              playerData['handValue'] = tallyHand( playerData['currentHand'] );
              console.log(`\nYour hand contains: ${playerData['currentHand']} for a value of ${playerData['handValue']}.`);
              break;
            case "stay":
              console.log("\nYou chose to stay.");
              break;
            default:
              console.log("\nThat is not a valid answer.");
              break;
          }
        } while ( hitOrStayAnswer !== "stay" && playerData['handValue'] < LIMIT );

        if ( playerData['handValue'] > LIMIT ) {
          console.log("\nYou busted.");
        } else {
          console.log(`\nYour hand contains: ${playerData['currentHand']} for a value of ${playerData['handValue']}.`);
        }
      } // End if (playerName !== "dealer") branch
    }); // End forEach loop
  } // End else branch


  // TODO: Compare dealer and player hands

  console.log("\nWould you like to play another round?");
  console.log("Type Yes or No and press Enter.");
  let playAnotherRoundAnswer= readline.question().toLowerCase();

  if ( playAnotherRoundAnswer === 'no' ) {
    game['activeGame'] = false;
  }
} // End while activeGame is true