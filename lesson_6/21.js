/*
** 1. Initialize deck – DONE
** 2. Deal cards to player and dealer - DONE
** 3. Player turn: hit or stay  - DONE
**    - repeat until bust or stay
** 4. If player bust, dealer wins. - DONE
** 5. Dealer turn: hit or stay - DONE
**    - repeat until total >= 17
** 6. If dealer busts, player wins. - DONE
** 7. Compare cards and declare winner. - DONE
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


function checkFor21(players) {
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
  return Object.entries(players).filter( player => player[1]['handValue'] === LIMIT );
}

function determineWinner(playersWhoHaveNotBusted) {
    let maxCallback = ( max, cur ) => Math.max( max, cur );
    let highestScore = playersWhoHaveNotBusted.map( player => player[1]['handValue'] ).reduce( maxCallback, -Infinity ); // returns a Number
    return playersWhoHaveNotBusted.filter( player => player[1]['handValue'] === highestScore );
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
      'gamesWon': 0
    };
  }); 

  return game;
}


// LOGIC
// 1. Create the game object and welcome messages
let game = initGame( ['Dealer', 'Player1', 'Player2'] );
console.log(`\n*** Welcome to Command Line Black Jack! ***`);


while ( game['activeGame'] ) {
  // 2. Create a new deck to pull from and update the number of games played
  game['deck'] = newDeck(SUITS, CARDS);
  game['gamesPlayed'] += 1;
  

  // 3. Create an array for the player names
  let playerNames = Object.keys( game['players'] ); // Example: ['dealer', 'player1']


  // 4. Announce the current round
  console.log(`\n\n\n=== Round ${game['gamesPlayed']} ===`);
  console.log("Good luck to all our players:");
  playerNames.forEach( player => console.log(`- ${player}`) );



  // 5. Deal cards to all the players and tally up the hands
  //   TODO: Explore passing in the player object instead.
  console.log("\n\n** The dealer is dealing out cards **");

  playerNames.forEach(function(playerName) {
    game['players'][playerName]['currentHand'] = dealCards(game['deck']);
    game['players'][playerName]['handValue'] = tallyHand( game['players'][playerName]['currentHand'] );
    game['players'][playerName]['busted'] = false;
    console.log(`${playerName}'s hand contains ${game['players'][playerName]['currentHand']} for a value of ${game['players'][playerName]['handValue']}.`);
  });


  // 6. Does anyone have Black Jack?
  //    If yes, end the game
  //    If no, ask each player to hit or stay
  let playersWith21 = checkFor21( game['players'] );

  if ( playersWith21.length > 0 ) {
    console.log("\n\nCongrats on Black Jack to these players:");

    playersWith21.forEach( player => {
      console.log(`- ${player[0]}`);
      game['players'][player[0]]['gamesWon'] += 1;
    });
  } else {
    playerNames.forEach(function(playerName) {

      if (playerName !== "Dealer") {
        let playerData = game['players'][playerName];
        let hitOrStayAnswer = null;

        do {
          console.log(`\n\n=== ${playerName}'s Turn ===`);
          console.log(`Hand: ${playerData['currentHand']}`);
          console.log(`Value: ${playerData['handValue']}`);
          console.log("Would you like to hit or stay?\n(Type Hit or Stay and press Enter.)");
          hitOrStayAnswer = readline.question().toLowerCase();

          switch (hitOrStayAnswer) {
            case "hit":
              console.log("\n\n** The dealer has given you a card. **");
              hit( playerData['currentHand'], game['deck'] );
              playerData['handValue'] = tallyHand( playerData['currentHand'] );
              break;

            case "stay":
              console.log(`\n\n** You chose to stay at ${playerData['handValue']} **`);
              break;

            default:
              console.log("\n\nThat is not a valid answer.");
              break;
          }
        } while ( hitOrStayAnswer !== "stay" && playerData['handValue'] < LIMIT );

        // 6a. Check if the player busted
        if ( playerData['handValue'] > LIMIT ) {
          playerData['busted'] = true;

          console.log(`\n\n** You busted **`);
          console.log(`Hand: ${playerData['currentHand']}`);
          console.log(`Value: ${playerData['handValue']}`);
        } else {
          console.log("Next player's turn...");
        }
      }
    });


    // 7. If all players have busted, the Dealer wins.
    //    Otherwise, the Dealer must auto hit if handValue is less than 17
    //    Dealer will stay if the hand value is 17 or more
    let didAllPlayersBust = Object.entries(game['players']).filter(player => player[0] !== "Dealer").every(player => player[1]['busted'] === true);
    
    if ( didAllPlayersBust ) {
      console.log("\n\nAll players have busted. Dealer wins!");
      game['players']['Dealer']['gamesWon'] += 1;
    } else {
      let dealerData = game['players']['Dealer'];

      while ( dealerData['handValue'] < 17 ) {
        console.log(`\n\n=== Dealers's Turn ===`);
        console.log(`Hand: ${dealerData['currentHand']}`);
        console.log(`Value: ${dealerData['handValue']}`);
        console.log("Dealer has less than 17 and must hit.");
        console.log("\n\n** The dealer has taken a card. **");

        hit( dealerData['currentHand'], game['deck'] );
        dealerData['handValue'] = tallyHand( dealerData['currentHand'] );
      }


      if ( dealerData['handValue'] > LIMIT ) {
        dealerData['busted'] = true;
        console.log("\n\n** Dealer busted **");
      } else {
        console.log(`\n\n** Dealer will stay **`);
      }

      console.log(`Hand: ${dealerData['currentHand']}`);
      console.log(`Value: ${dealerData['handValue']}`);


      // 8. Now we check for a winner
      let playersWhoHaveNotBusted = Object.entries(game['players']).filter(player => player[1]['busted'] === false);

      if ( playersWhoHaveNotBusted.length === 1 ) {
        console.log(`\n\nCongratulations to ${playersWhoHaveNotBusted[0][0]} for winning this round!`);  
        game['players'][playersWhoHaveNotBusted[0][0]]['gamesWon'] += 1;
      } else {
        let winners = determineWinner(playersWhoHaveNotBusted);

        console.log("\n\nCongratulations to our winners:");
        winners.map( winner => {
          console.log(`- ${winner[0]}`);
          game['players'][winner[0]]['gamesWon'] += 1;
        });
      }
    }    
  }


  console.log("\n\n*** Scoreboard ***");
  Object.entries(game['players']).forEach(player => console.log(`${player[0]}: ${player[1]['gamesWon']}`) );

  console.log("\nWould you like to play another round?");
  console.log("Type Yes or No and press Enter.");
  let playAnotherRoundAnswer= readline.question().toLowerCase();

  if ( playAnotherRoundAnswer === 'no' ) {
    game['activeGame'] = false;
  }
} // End while activeGame is true