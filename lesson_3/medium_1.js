/*
** QUESTION 1
** Let's do some "ASCII Art": a stone-age form of nerd artwork from back in the
** days before computers had video screens.
** 
** For this practice problem, write a program that outputs The Flintstones Rock!
** 10 times, with each line indented 1 space to the right of the line above it.
** The output should start out like this:
*/
let numberOfTimesToPrint = 10;
let msgToPrint = "The Flintstones Rock!";

const flintstonesRockTenTimes = function(num, msg) {
  const unicodeSpaceChar = '\u0020'

  for(let i = 0; i <= num; i += 1) {
    console.log(msg.padStart(i + msg.length, unicodeSpaceChar)); 
  }
};

flintstonesRockTenTimes(numberOfTimesToPrint, msgToPrint);


/*
** QUESTION 2
** Starting with the string:
** let munstersDescription = "The Munsters are creepy and spooky.";
** 
** Return a new string that swaps the case of all of the letters:
** `tHE mUNSTERS ARE CREEPY AND SPOOKY.`
*/
let munstersDescription = "The Munsters are creepy and spooky.";
const reverseCase = function(str) {
  let splitStr = munstersDescription.split('');
  let reversedCaseStr = splitStr.map(function(letter) {
    // If a letter is upper case, we change it to downcase and vice versa
    return ( letter === letter.toUpperCase() ) ? letter.toLowerCase() : letter.toUpperCase();
  });
  console.log( reversedCaseStr.join('') );
}
reverseCase(munstersDescription);

