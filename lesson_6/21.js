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
const HIT_OR_STAY_VALID_CHOICES = ["hit", "stay"];

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
let game = initGame( ['dealer', 'player1'] );


while ( game['activeGame'] ) {
  // 2. Create a new deck to pull from and update the number of games played
  game['deck'] = newDeck(SUITS, CARDS);
  game['gamesPlayed'] += 1;
  

  // 3. Create arrays for players and winners to use later
  let playerNames = Object.keys( game['players'] ); // Example: ['dealer', 'player1']
  let winners = [];


  // 4. Create welcome messages
  console.log(`*** Welcome to Command Line Black Jack! ***`);
  console.log(`Good luck to all our players: ${playerNames}\n`);
  console.log(`Round ${game['gamesPlayed']}`);


  // 5. Deal cards to all the players and tally up the hands
  //    If someone has Black Jack, add it to the winners array.
  playerNames.forEach(function(playerName) {
    game['players'][playerName]['currentHand'] = dealCards(game['deck']);
    game['players'][playerName]['handValue'] = tallyHand( game['players'][playerName]['currentHand'] );

    if ( game['players'][playerName]['handValue'] === LIMIT ) {
      game['players'][playerName]['gamesWon'] += 1;
      winners.push(playerName);
    }

    console.log(`${playerName}'s hand contained ${game['players'][playerName]['currentHand']} for a value of ${game['players'][playerName]['handValue']}.`);
  });


  // 6. If a player has Black Jack, print a message to the console.
  //    Otherwise, ask each player to either hit or stay.
  if (winners.length > 0) {
    let msg = "Black Jack! Congratulations to: ";
    winners.forEach(function(winner){
      msg += winner;
    });
    console.log(msg); 
  } else {
      // Let each player either hit or stay
      playerNames.forEach(function(playerName) {
        if (playerName !== "dealer") {
          let playerData = game['players'][playerName];

          console.log("\n== Would you like to hit or stay? ==");
          console.log("Type Hit or Stay and press Enter.");
          let hitOrStayAnswer = readline.question().toLowerCase();

          // Test for gibberish
          while ( !HIT_OR_STAY_VALID_CHOICES.includes(hitOrStayAnswer) ) {
            console.log("That is not a valid answer.");
            console.log("Type Hit or Stay and press Enter.");
            hitOrStayAnswer = readline.question();
          }

          while (hitOrStayAnswer === "hit") {
            // Add card to the hand
            hit(playerData['currentHand'], game['deck']);

            // Tally the hand's value
            playerData['handValue'] = tallyHand(playerData['currentHand']);

            // Print a status message to the console.
            console.log(`Your hand now contains: ${playerData['currentHand']} for a value of ${playerData['handValue']}.`);
            
            // Review the hand
            if ( playerData['handValue'] < LIMIT && playerData['handValue'] !== LIMIT ) {
              console.log("Would you like to hit or stay?");
              hitOrStayAnswer = readline.question();
            } else if ( playerData['handValue'] === LIMIT ) {
                hitOrStayAnswer = null;
                console.log(`You won the game`);
                playerData['gamesWon'] += 1;
            } else {
                hitOrStayAnswer = null;
                console.log(`You busted.`);
            }
          } // End while hitOrStayAnswer === hit
        } // End if !== dealer
      }); // End forEach loop

      // TODO: If handValue is < 17, auto hit
      // TODO: Compare dealer and player hands

      console.log("Would you like to play another round?");
      console.log("Type Yes or No and press Enter.");
      let playAnotherRoundAnswer= readline.question().toLowerCase();

      if ( playAnotherRoundAnswer === 'no' ) {
        game['activeGame'] = false;
      }
  } // End else
} // End while activeGame is true